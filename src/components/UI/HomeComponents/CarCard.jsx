import {
  ArrowRight,
  Users,
  Fuel,
  Gauge,
  CheckCircle,
} from "lucide-react";
import {
  computeEffectiveAvailability,
  computeAvailableMeta,
  formatDate,
  plural,
  isBookDisabled,
} from "../../utils/availabilityUtils";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";
const FALLBACK_IMAGE = API_BASE_URL
  ? `${API_BASE_URL}/uploads/default-car.png`
  : "https://via.placeholder.com/400x250.png?text=No+Image";

const buildImageSrc = (img) => {
  if (!img) return "";
  if (Array.isArray(img)) img = img[0];
  if (typeof img !== "string") return "";
  const t = img.trim();
  if (!t) return "";

  if (t.startsWith("http")) return t;
  if (t.startsWith("/")) return `${API_BASE_URL}${t}`;
  return `${API_BASE_URL}/uploads/${t}`;
};

const handleImageError = (e) => {
  const img = e.target;
  if (!img) return;

  img.onerror = null;
  img.src = FALLBACK_IMAGE;

  img.onerror = () => {
    img.onerror = null;
    img.src =
      "https://via.placeholder.com/400x250.png?text=No+Image";
  };

  img.alt = img.alt || "Image unavailable";
  img.style.objectFit = img.style.objectFit || "cover";
};

const renderAvailabilityBadge = (effective) => {
  if (!effective) return null;

  if (effective.state === "booked") {
    const meta = effective.until
      ? computeAvailableMeta(effective.until)
      : null;

    return (
      <div className="flex flex-col items-end">
        <span className="px-2 py-1 text-xs rounded-md bg-red-50 text-red-700 font-semibold">
          Booked
          {meta?.availableIso &&
            ` — available on ${formatDate(meta.availableIso)}`}
        </span>

        {effective.until && (
          <small className="text-xs text-gray-400 mt-1">
            until {formatDate(effective.until)}
          </small>
        )}
      </div>
    );
  }

  if (effective.state === "available_until_reservation") {
    const d = Number(effective.daysAvailable ?? -1);

    return (
      <div className="flex flex-col items-end">
        <span className="px-2 py-1 text-xs rounded-md bg-amber-50 text-amber-800 font-semibold">
          {d >= 0
            ? `Available — reserved in ${plural(d, "day")}`
            : "Available"}
        </span>

        {effective.nextBookingStarts && (
          <small className="text-xs text-gray-400 mt-1">
            from {formatDate(effective.nextBookingStarts)}
          </small>
        )}
      </div>
    );
  }

  return (
    <span className="px-2 py-1 text-xs rounded-md bg-green-50 text-green-700">
      Available
    </span>
  );
};
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
    styles.cardPatterns && styles.cardPatterns.length
      ? styles.cardPatterns[index % styles.cardPatterns.length]
      : "";
  const borderStyle =
    styles.borderGradients && styles.borderGradients.length
      ? styles.borderGradients[index % styles.borderGradients.length]
      : "";

  const effectiveAvailability = computeEffectiveAvailability(car);
  const disabled = isBookDisabled(car, effectiveAvailability);

  const imageSrc = buildImageSrc(car.image) || FALLBACK_IMAGE;

  const transform =
    animateCards === false
      ? "translateY(40px)"
      : hoveredCard === carId
      ? "rotate(0.5deg)"
      : "none";

  const handleClickBook = () => {
    if (disabled) return;
    onBook(car);
  };

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
        <span className={styles.priceText}>
          ₹{car.dailyRate ?? car.price ?? 0}/day
        </span>
      </div>

      <div className="absolute right-4 top-4 z-20">
        {renderAvailabilityBadge(effectiveAvailability)}
      </div>
      <div className={styles.imageContainer}>
        <img
          src={imageSrc}
          alt={carName}
          onError={handleImageError}
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
              <span className={styles.carTypeBadge}>{car.type}</span>
              <span className={styles.carYear}>{car.year}</span>
            </p>
          </div>
        </div>

        <div className={styles.specsGrid}>
          {[
            { icon: Users, value: car.seats || "4", label: "Seats" },
            {
              icon: Fuel,
              value: car.fuelType || "Gasoline",
              label: "Fuel",
            },
            {
              icon: Gauge,
              value: car.mileage ? `${car.mileage} kmpl` : "—",
              label: "Mileage",
            },
            {
              icon: CheckCircle,
              value: car.transmission || "Auto",
              label: "Trans",
            },
          ].map((spec, i) => (
            <div key={i} className={styles.specItem}>
              <div
                className={styles.specIconContainer(
                  hoveredCard === carId
                )}
              >
                <spec.icon
                  className={styles.specIcon(
                    hoveredCard === carId
                  )}
                />
              </div>
              <span className={styles.specValue}>{spec.value}</span>
              <span className={styles.specLabel}>{spec.label}</span>
            </div>
          ))}
        </div>

        <button
          onClick={handleClickBook}
          disabled={disabled}
          className={`${styles.bookButton} ${
            disabled
              ? "opacity-60 cursor-not-allowed"
              : "hover:shadow-md"
          }`}
          aria-disabled={disabled}
          title={
            disabled
              ? "This car is currently booked or unavailable"
              : "Book this car"
          }
        >
          <span className={styles.buttonText}>
            {disabled ? "Unavailable" : "Book Now"}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>

      <div className={styles.accentBlur}></div>
    </div>
  );
};

export default CarCard;
