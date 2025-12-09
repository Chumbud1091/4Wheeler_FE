import { useEffect, useState, useRef } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import {
  FaUserFriends,
  FaGasPump,
  FaTachometerAlt,
  FaCheckCircle,
  FaArrowLeft,
  FaCar,
  FaHeart,
  FaRegHeart,
} from "react-icons/fa";

import client from "../../services/client";
import { carDetailStyles } from "../../assets/dummyStyles";
import carsData from "../../assets/carsData";
import { useAuth } from "../../hooks/useAuth";
import { toastError } from "../utils/toastUtils";
import BookTestDriveButton from "../UI/CarComponents/BookTestDriveButton.jsx";

const CarPageDetails = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [car, setCar] = useState(() => location.state?.car || null);
  const [loadingCar, setLoadingCar] = useState(false);
  const [carError, setCarError] = useState("");
  const [currentImage, setCurrentImage] = useState(0);
  const { isLoggedIn } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  const fetchControllerRef = useRef(null);

  useEffect(() => {
    const checkFavorite = async () => {
      if (!isLoggedIn || !car?._id) return;

      try {
        const res = await client.get("/auth/users/profile");
        const favs = res.data?.user?.favorites || [];
        setIsFavorite(favs.some((f) => f._id === car._id));
      } catch {
        // ignore
      }
    };
    checkFavorite();
  }, [car, isLoggedIn]);

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
        const res = await client.get(`/cars/${id}`, {
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
  const price = Number(car.price ?? 0);
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
    carImages[currentImage] || carImages[0] || car.image;

  const toggleFavorite = async () => {
    if (!isLoggedIn) {
      toastError("Please log in to manage favorites.");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    try {
      if (isFavorite) {
        await client.delete(`/cars/favorites/${car._id}`);
        setIsFavorite(false);
      } else {
        await client.post(`/cars/favorites/${car._id}`);
        setIsFavorite(true);
      }
    } catch (err) {
      console.error(err);
      toastError("Failed to update favorite");
    }
  };

  const details = [
    { label: "Make", value: car.make || "—" },
    { label: "Model", value: car.model || "—" },
    { label: "Year", value: year || "—" },
    { label: "Price", value: price ? `$${price.toLocaleString()}` : "—" },
    { label: "Category", value: category },
    { label: "Color", value: color || "—" },
    { label: "Seats", value: seats },
    { label: "Transmission", value: transmissionLabel },
    { label: "Fuel Type", value: fuel },
    { label: "Engine", value: engine || "—" },
    { label: "Horsepower", value: horsepower || "—" },
  ];

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
            <div className="relative w-full rounded-2xl overflow-hidden">
              {carImages.length <= 1 ? (
                <img
                  src={mainImage}
                  alt={displayName}
                  className="w-full h-[320px] md:h-[380px] object-cover rounded-2xl"
                />
              ) : (
                <>
                  <div
                    className="flex transition-transform duration-500"
                    style={{
                      width: `${carImages.length * 100}%`,
                      transform: `translateX(-${currentImage * (100 / carImages.length)}%)`,
                    }}
                  >
                    {carImages.map((img, i) => (
                      <img
                        key={i}
                        src={img}
                        alt={`image-${i}`}
                        className="w-full h-[320px] md:h-[380px] object-cover flex-shrink-0"
                      />
                    ))}
                  </div>

                  <button
                    onClick={() =>
                      setCurrentImage(
                        currentImage === 0 ? carImages.length - 1 : currentImage - 1
                      )
                    }
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition"
                  >
                    ❮
                  </button>

                  <button
                    onClick={() =>
                      setCurrentImage(
                        currentImage === carImages.length - 1 ? 0 : currentImage + 1
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white rounded-full p-2 transition"
                  >
                    ❯
                  </button>

                  <div className="flex gap-2 justify-center mt-3">
                    {carImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImage(idx)}
                        className={`border rounded-md overflow-hidden ${idx === currentImage
                            ? "border-white scale-110"
                            : "border-gray-600 opacity-70"
                          } transition`}
                      >
                        <img
                          src={img}
                          alt={`Thumb ${idx}`}
                          className="w-14 h-12 object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            <h1 className={carDetailStyles.carName}>
              <span>{displayName}</span>
              <button
                onClick={toggleFavorite}
                className="text-red-500 text-2xl ml-3 hover:scale-110 transition"
              >
                {isFavorite ? <FaHeart /> : <FaRegHeart />}
              </button>
            </h1>

            <p className={carDetailStyles.carPrice}>
              ${price.toLocaleString()}
            </p>

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
                  color: "text-orange-400",
                },
                {
                  Icon: FaTachometerAlt,
                  label: "Engine",
                  value: engine || "—",
                  color: "text-orange-400",
                },
                {
                  Icon: FaCheckCircle,
                  label: "Transmission",
                  value: transmissionLabel,
                  color: "text-orange-400",
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
                {car.description ||
                  "This vehicle offers a refined balance of performance and comfort."}
              </p>
            </div>
          </div>

          <div className={carDetailStyles.rightColumn}>
            <div className="bg-[#050816]/80 border border-white/10 rounded-2xl p-6 shadow-xl backdrop-blur-md min-h-[260px]">
              <h2 className="text-lg font-semibold text-white mb-4">
                Car Details
              </h2>

              <div className="space-y-3 text-sm">
                {details.map((item) => (
                  <div
                    key={item.label}
                    className="flex justify-between items-center border-b border-white/5 pb-2 last:border-b-0 last:pb-0"
                  >
                    <span className="text-gray-400">{item.label}</span>
                    <span className="text-gray-100 font-medium ml-4">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <BookTestDriveButton
              carId={car._id || car.id}
              carName={displayName}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarPageDetails;
