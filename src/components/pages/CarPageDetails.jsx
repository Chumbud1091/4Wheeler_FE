import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  FaUserFriends,
  FaGasPump,
  FaTachometerAlt,
  FaCheckCircle,
  FaArrowLeft,
  FaCar,
} from "react-icons/fa";

import client from "../../services/client";
import { carDetailStyles } from "../../assets/dummyStyles";
import carsData from "../../assets/carsData";

const CarPageDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [car, setCar] = useState(() => location.state?.car || null);
  const [loadingCar, setLoadingCar] = useState(false);
  const [carError, setCarError] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  const fetchControllerRef = useRef(null);

  useEffect(() => {
    if (car) {
      setCurrentImage(0);
      return;
    }

    const local = carsData.find((c) => String(c._id || c.id) === String(id));
    if (local) {
      setCar(local);
      setCurrentImage(0);
      return;
    }

    const controller = new AbortController();
    fetchControllerRef.current = controller;

    (async () => {
      setLoadingCar(true);
      setCarError("");
      try {
        const res = await client.get(`/api/cars/${id}`, {
          signal: controller.signal,
        });
        const payload = res.data?.data ?? res.data ?? null;
        if (payload) setCar(payload);
        else setCarError("Car not found.");
      } catch (err) {
        const canceled =
          err?.code === "ERR_CANCELED" ||
          err?.name === "CanceledError" ||
          err?.message === "canceled";
        if (!canceled) {
          console.error("Failed to fetch car:", err);
          setCarError(
            err?.response?.data?.message ||
              err.message ||
              "Failed to load car"
          );
        }
      } finally {
        setLoadingCar(false);
      }
    })();

    return () => {
      try {
        controller.abort();
      } catch {
        // ignore
      }
      fetchControllerRef.current = null;
    };
  }, [id, car]);

  if (!car && loadingCar) {
    return <div className="p-6 text-white">Loading car...</div>;
  }

  if (!car && carError) {
    return <div className="p-6 text-red-400">{carError}</div>;
  }

  if (!car) {
    return <div className="p-6 text-white">Car not found.</div>;
  }

  const displayName =
    `${car.make || ""} ${car.model || ""}`.trim() ||
    car.model ||
    car.make ||
    "Unnamed car";

  const category = car.category || car.type || "Sedan";
  const pricePerDay = Number(car.dailyRate ?? car.price ?? 0) || 0;
  const seats = car.seats ?? 4;
  const fuel = car.fuelType || car.fuel || "Gasoline";
  const transmissionLabel = car.transmission || "Automatic";
  const engine = car.engine || "";
  const horsepower = car.horsepower;
  const color = car.color || "";
  const year = car.year;

  const carImages = [
    ...(Array.isArray(car.images) ? car.images : []),
    ...(car.image
      ? Array.isArray(car.image)
        ? car.image
        : [car.image]
      : []),
  ].filter(Boolean);

  const mainImage =
    carImages[currentImage] ||
    carImages[0] ||
    car.image

  return (
    <div className={carDetailStyles.pageContainer}>
      <div className={carDetailStyles.contentContainer}>
        <button
          onClick={() => navigate(-1)}
          className={carDetailStyles.backButton}
        >
          <FaArrowLeft className={carDetailStyles.backButtonIcon} />
        </button>

        <div className={carDetailStyles.mainLayout}>
          <div className={carDetailStyles.leftColumn}>
            <div className={carDetailStyles.imageCarousel}>
              <img
                src={mainImage}
                alt={displayName}
                className={carDetailStyles.carImage}
              />

              {(carImages.length > 0 || car.image) && (
                <div className={carDetailStyles.carouselIndicators}>
                  {(carImages.length > 0 ? carImages : [car.image]).map(
                    (_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImage(idx)}
                        aria-label={`Show image ${idx + 1}`}
                        className={carDetailStyles.carouselIndicator(
                          idx === currentImage
                        )}
                      />
                    )
                  )}
                </div>
              )}
            </div>

            <h1 className={carDetailStyles.carName}>{displayName}</h1>
            <p className={carDetailStyles.carPrice}>
              ${pricePerDay}{" "}
              <span className={carDetailStyles.pricePerDay}>/ day</span>
            </p>

            <div className="mt-2 text-sm text-gray-300 flex flex-wrap gap-3">
              {year && (
                <span className="inline-flex items-center gap-1">
                  <FaCar className="text-orange-400" />
                  {year}
                </span>
              )}
              {color && (
                <span className="inline-flex items-center gap-1">
                  <span
                    className="inline-block w-3 h-3 rounded-full border border-gray-500"
                    style={{ backgroundColor: color }}
                  />
                  {color}
                </span>
              )}
              <span>{category}</span>
              {engine && <span>{engine}</span>}
              {horsepower && <span>{horsepower} HP</span>}
            </div>

            <div className={carDetailStyles.specsGrid}>
              {[
                {
                  Icon: FaUserFriends,
                  label: "Seats",
                  value: seats,
                  color: "text-orange-400",
                },
                {
                  Icon: FaGasPump,
                  label: "Fuel",
                  value: fuel,
                  color: "text-green-400",
                },
                {
                  Icon: FaTachometerAlt,
                  label: "Engine",
                  value: engine || "—",
                  color: "text-yellow-400",
                },
                {
                  Icon: FaCheckCircle,
                  label: "Transmission",
                  value: transmissionLabel,
                  color: "text-purple-400",
                },
              ].map((spec, i) => (
                <div key={i} className={carDetailStyles.specCard}>
                  <spec.Icon
                    className={`${spec.color} ${carDetailStyles.specIcon}`}
                  />
                  <p
                    className={
                      carDetailStyles.aboutText +
                      " " +
                      carDetailStyles.specLabel
                    }
                  >
                    {spec.label}
                  </p>
                  <p className={carDetailStyles.specValue}>{spec.value}</p>
                </div>
              ))}
            </div>

            <div className={carDetailStyles.aboutSection}>
              <h2 className={carDetailStyles.aboutTitle}>About this car</h2>
              <p className={carDetailStyles.aboutText}>
                Experience luxury in the {displayName}.{" "}
                {year && <>This model year is {year}. </>}
                With its {transmissionLabel.toLowerCase()} transmission and
                seating for {seats}, every journey is exceptional.
              </p>
              <p className={carDetailStyles.aboutText}>
                {car.description ||
                  "This car combines performance and comfort for an unforgettable drive."}
              </p>

              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-400 mr-2 text-sm" />
                  <span className="text-gray-300 text-sm">
                    Free cancellation
                  </span>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-400 mr-2 text-sm" />
                  <span className="text-gray-300 text-sm">
                    24/7 Roadside assistance
                  </span>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-400 mr-2 text-sm" />
                  <span className="text-gray-300 text-sm">
                    Unlimited mileage
                  </span>
                </div>
                <div className="flex items-center">
                  <FaCheckCircle className="text-green-400 mr-2 text-sm" />
                  <span className="text-gray-300 text-sm">
                    Collision damage waiver
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarPageDetails;
