import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../services/client";
import { carPageStyles as styles } from "../../assets/dummyStyles";
import UserNavBar from "../UI/NavBar/UserNavBar";
import CarCardSkeleton from "../UI/CarComponents/CarCardSkeleton";
import CarCard from "../UI/CarComponents/CarCard";
import carsData from "../../assets/carsData";
import { toastError } from "../utils/toastUtils";
import Footer from "../UI/Footer/Footer";

const limit = 12;

const Cars = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [animateCards, setAnimateCards] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);


  const abortRef = useRef(null);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      abortRef.current?.abort();
    } catch {
      // ignore
    }

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await client.get("/api/cars", {
        params: { limit },
        signal: ctrl.signal,
      });
      if (res?.data?.data?.length > 0) {
        setCars(res.data.data);
        return;
      }
      console.warn("API returned empty data. Using fallback carsData.");
      setCars(carsData.slice(0, limit));
    } catch (err) {
      console.error("Error fetching cars, using fallback data:", err);
      setCars(carsData.slice(0, limit));
      setError("");
      toastError(err?.response?.data?.message || err.message || "Failed to load cars")
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setAnimateCards(true), 300);
    fetchCars();

    return () => {
      clearTimeout(t);
      try {
        abortRef.current?.abort();
      } catch {
        // ignore
      }
    };
  }, [fetchCars]);

  const handleBook = (car) => {
    navigate(`/cars/${car._id || car.id}`, { state: { car } });
  };

  return (
    <>
      <UserNavBar />
      <div className={styles.pageContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.headerDecoration}></div>
            <h1 className={styles.title}>Premium Car Collection</h1>
            <p className={styles.subtitle}>
              Discover our exclusive experience of luxury vehicles. Each car is meticulously maintained and ready for your journey.
            </p>
          </div>
          <div className={styles.gridContainer}>
            {loading &&
              Array.from({ length: limit }).map((_, idx) => (
                <CarCardSkeleton
                  key={`s-${idx}`}
                  index={idx}
                  styles={styles}
                />
              ))}

            {!loading && error && (
              <div className="col-span-full text-center text-red-600">
                {error}
              </div>
            )}

            {!loading && !error && cars.length === 0 && (
              <div className="col-span-full text-center">
                No cars available.
              </div>
            )}

            {!loading &&
              !error &&
              cars.map((car, idx) => (
                <CarCard
                  key={car._id || car.id || idx}
                  car={car}
                  index={idx}
                  styles={styles}
                  animateCards={animateCards}
                  hoveredCard={hoveredCard}
                  setHoveredCard={setHoveredCard}
                  onBook={handleBook}
                />
              ))}
          </div>

          <div className={styles.decor1}></div>
          <div className={styles.decor2}></div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cars;