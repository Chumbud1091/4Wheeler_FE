import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Fuel, Gauge, CheckCircle } from "lucide-react";

const CarCard = ({
  car,
  index,
  styles,
  animateCards,
  hoveredCard,
  setHoveredCard,
  onBook,
}) => {
  const carId = car._id || car.id;

  const carName =
    `${car.make || ""} ${car.model || ""}`.trim() ||
    car.name ||
    "Unnamed Car";

  const patternStyle =
    styles.cardPatterns?.length
      ? styles.cardPatterns[index % styles.cardPatterns.length]
      : "";

  const borderStyle =
    styles.borderGradients?.length
      ? styles.borderGradients[index % styles.borderGradients.length]
      : "";

  const imageSrc = car.images?.[0];

  const transform =
    animateCards === false
      ? "translateY(40px)"
      : hoveredCard === carId
        ? "rotate(0.5deg)"
        : "none";

  return (
    <div
      onMouseEnter={() => setHoveredCard(carId)}
      onMouseLeave={() => setHoveredCard(null)}
      className={`${styles.card} ${patternStyle} border ${borderStyle} hover:shadow-2xl hover:-translate-y-3`}
      style={{
        clipPath:
          "polygon(0% 15%, 15% 0%, 100% 0%, 100% 85%, 85% 100%, 0% 100%)",
        transformStyle: "preserve-3d",
        transform,
        opacity: animateCards ? 1 : 0,
        transition:
          "transform 420ms cubic-bezier(.2,.8,.2,1), opacity 420ms ease",
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <div className={styles.borderOverlay}></div>

      <div className={styles.priceBadge}>
        <span className={styles.priceText}>${car.price ?? 0}</span>
      </div>

      <div className={styles.imageContainer}>
        <img
          src={imageSrc}
          alt={carName}
          className="w-full h-full object-cover transition-transform duration-500"
          style={{
            transform:
              hoveredCard === carId ? "rotate(0.5deg)" : "scale(1)",
          }}
        />
      </div>

      <div className={styles.content}>
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className={styles.carName}>{carName}</h3>
            <p className={styles.carInfoContainer}>
              <span className={styles.carTypeBadge}>{car.category}</span>
              <span className={styles.carYear}>{car.year}</span>
            </p>
          </div>
        </div>

        <div className={styles.specsGrid}>
          {[
            { icon: Users, value: car.seats || "4", label: "Seats" },
            { icon: Fuel, value: car.fuelType || "Gasoline" },
            { icon: Gauge, value: car.engine ? `${car.engine}` : "—" },
            { icon: CheckCircle, value: car.transmission || "Auto" },
          ].map((spec, i) => (
            <div key={i} className={styles.specItem}>
              <div className={styles.specIconContainer(hoveredCard === carId)}>
                <spec.icon className={styles.specIcon(hoveredCard === carId)} />
              </div>
              <span className={styles.specValue}>{spec.value}</span>
              <span className={styles.specLabel}>{spec.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-auto pt-4">
          <button
            onClick={() => onBook(car)}
            className={`${styles.bookButton} hover:shadow-md`}
            title="View details"
          >
            <span className={styles.buttonText}>
              View Details
              <ArrowRight className="ml-2 w-4 h-4" />
            </span>
          </button>
        </div>
      </div>

      <div className={styles.accentBlur}></div>
    </div>
  );
};

export default CarCard;
