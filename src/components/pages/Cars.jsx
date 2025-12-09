import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../services/client";
import { carPageStyles as styles } from "../../assets/dummyStyles";
import UserNavBar from "../UI/NavBar/UserNavBar";
import CarCardSkeleton from "../UI/CarComponents/CarCardSkeleton";
import CarCard from "../UI/CarComponents/CarCard";
import Footer from "../UI/Footer/Footer";

const LIMIT = 12;

const Cars = () => {
  const navigate = useNavigate();

  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [animateCards, setAnimateCards] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [total, setTotal] = useState(0);

  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");

  const abortRef = useRef(null);

  const fetchCars = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      abortRef.current?.abort();
    } catch {}

    const ctrl = new AbortController();
    abortRef.current = ctrl;

    try {
      const res = await client.get("/cars/listing", {
        params: {
          page,
          limit: LIMIT,
          search: search || undefined,     
          category: category || undefined, 
          status: "available",            
        },
        signal: ctrl.signal,
      });
      console.log("res.data cars/listing:", res.data);
      const { page: apiPage, pages: apiPages, total: apiTotal, cars: apiCars } =
        res.data || {};

      setCars(apiCars || []);
      setPage(apiPage || 1);
      setPages(apiPages || 1);
      setTotal(apiTotal || (apiCars ? apiCars.length : 0));
    } catch (err) {
      console.error("Error fetching cars:", err);
      const msg =
        err?.response?.data?.message || err.message || "Failed to load cars";
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, [page, search, category]);

  useEffect(() => {
    const t = setTimeout(() => setAnimateCards(true), 300);
    fetchCars();

    return () => {
      clearTimeout(t);
      try {
        abortRef.current?.abort();
      } catch {}
    };
  }, [fetchCars]);

  const handleBook = (car) => {
    navigate(`/cars/${car._id || car.id}`, { state: { car } });
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setSearch(searchInput.trim());
  };

  const handleClearFilters = () => {
    setSearchInput("");
    setSearch("");
    setCategory("");
    setPage(1);
  };

  const handlePrevPage = () => setPage((p) => Math.max(1, p - 1));
  const handleNextPage = () => setPage((p) => Math.min(pages, p + 1));

  return (
    <>
      <UserNavBar />
      <div className={styles.pageContainer}>
        <div className={styles.contentContainer}>
          <div className={styles.headerContainer}>
            <div className={styles.headerDecoration}></div>
            <h1 className={styles.title}>Premium Car Collection</h1>
            <p className={styles.subtitle}>
              Discover our exclusive collection of premium vehicles.
            </p>
          </div>

          <div className="mt-6 mb-6 flex flex-col lg:flex-row gap-4 lg:items-end">
            <form
              onSubmit={handleSearchSubmit}
              className="flex-1 flex flex-col sm:flex-row gap-3"
            >
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-1">
                  Search by make or model
                </label>
                <input
                  type="text"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  placeholder="e.g. BMW, Toyota, Civic..."
                  className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex items-end gap-2">
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-sm font-semibold text-white transition"
                >
                  Search
                </button>
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-sm text-gray-100 transition"
                >
                  Clear
                </button>
              </div>
            </form>

            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              <div className="flex-1">
                <label className="block text-sm text-gray-300 mb-1">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => {
                    setCategory(e.target.value);
                    setPage(1);
                  }}
                  className="w-full rounded-lg bg-black/40 border border-white/10 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">All categories</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Coupe">Coupe</option>
                  <option value="Sports">Sports</option>
                  <option value="Luxury">Luxury</option>
                </select>
              </div>

            </div>
          </div>
          <div className={styles.gridContainer}>
            {loading &&
              Array.from({ length: LIMIT }).map((_, idx) => (
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
                No cars found.
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

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="text-sm text-gray-300">
              Total:{" "}
              <span className="font-semibold">
                {total?.toLocaleString?.() || total} cars
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevPage}
                disabled={page <= 1 || loading}
                className={`px-3 py-1.5 rounded-lg text-sm ${
                  page <= 1 || loading
                    ? "bg-white/5 text-gray-500 cursor-not-allowed"
                    : "bg-white/10 text-gray-100 hover:bg-white/20"
                } transition`}
              >
                Prev
              </button>
              <span className="text-sm text-gray-200">
                Page{" "}
                <span className="font-semibold">{page}</span> of{" "}
                <span className="font-semibold">{pages}</span>
              </span>
              <button
                onClick={handleNextPage}
                disabled={page >= pages || loading}
                className={`px-3 py-1.5 rounded-lg text-sm ${
                  page >= pages || loading
                    ? "bg-white/5 text-gray-500 cursor-not-allowed"
                    : "bg-white/10 text-gray-100 hover:bg-white/20"
                } transition`}
              >
                Next
              </button>
            </div>
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
