import React, { useEffect, useState, useRef, useCallback } from "react";
import { Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import client from "../../../services/client";
import { homeStyles as styles } from "../../../assets/dummyStyles"; 
import CarCard from "./CarCard";
import CarCardSkeleton from "./CarCardSkeleton";
import carsData from "../../../assets/carsData";

const HomeCars = () => {
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [animateCards, setAnimateCards] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const abortRef = useRef(null);

  const limit = 6;

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
      setCars(carsData);
    } catch (err) {
      console.error("Error fetching cars, using fallback data:", err);
      setCars(carsData);
      setError("");
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
        //ignore
      }
    };
  }, [fetchCars]);

  const handleBook = (car) => {
    navigate(`/cars/${car._id || car.id}`, { state: { car } });
  };

  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.headerContainer}>
        <div className={styles.premiumBadge}>
          <Zap className="w-4 h-4 text-amber-400 mr-2" />
          <span className={styles.premiumText}>Premium Fleet Selection</span>
        </div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 w-full">
          <div className="w-full text-center">
            <h1 className={styles.title}>Luxury Car Collection</h1>
            <p className={styles.subtitle}>
              Discover premium vehicles with exceptional performance and comfort
              for your next journey
            </p>
          </div>
        </div>
      </div>

      <div className={styles.grid}>
        {loading &&
          Array.from({ length: limit }).map((_, idx) => (
            <CarCardSkeleton key={`s-${idx}`} index={idx} />
          ))}

        {!loading && error && (
          <div className="col-span-full text-center text-red-600">
            {error}
          </div>
        )}
        {!loading && !error && cars.length === 0 && (
          <div className="col-span-full text-center">No cars found.</div>
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
    </div>
  );
};

export default HomeCars;
