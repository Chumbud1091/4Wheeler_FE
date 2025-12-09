import { useEffect, useMemo, useRef, useState } from "react";
import { FaPlus, FaSearch, FaTimes, FaBalanceScale } from "react-icons/fa";
import UserNavBar from "../UI/NavBar/UserNavBar";
import Footer from "../UI/Footer/Footer";
import client from "../../services/client";

const Compare = () => {
  const [activeSlot, setActiveSlot] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchError, setSearchError] = useState("");

  const [selectedCars, setSelectedCars] = useState({ left: null, right: null });

  const [compareLoading, setCompareLoading] = useState(false);
  const [comparison, setComparison] = useState("");
  const [compareError, setCompareError] = useState("");

  const abortRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedTerm(searchTerm.trim()), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  useEffect(() => {
    if (!activeSlot) return;
    const fetchCars = async () => {
      setSearchLoading(true);
      setSearchError("");

      try {
        abortRef.current?.abort();
      } catch (err) {
        console.debug("Compare search cleanup: abort previous request", err);
      }

      const controller = new AbortController();
      abortRef.current = controller;

      try {
        const res = await client.get("/cars/listing", {
          params: {
            page: 1,
            limit: 8,
            search: debouncedTerm || undefined,
          },
          signal: controller.signal,
        });

        setSearchResults(res.data?.cars || []);
      } catch (err) {
        const canceled = err?.name === "CanceledError" || err?.code === "ERR_CANCELED";
        if (!canceled) {
          setSearchError(
            err?.response?.data?.message || err.message || "Unable to load cars"
          );
        }
      } finally {
        setSearchLoading(false);
      }
    };

    fetchCars();

    return () => {
      try {
        abortRef.current?.abort();
      } catch (err) {
        console.debug("Compare search cleanup: abort on unmount", err);
      }
    };
  }, [activeSlot, debouncedTerm]);

  const handleSelectCar = (car) => {
    if (!activeSlot) return;
    setSelectedCars((prev) => ({ ...prev, [activeSlot]: car }));
    setActiveSlot(null);
    setSearchTerm("");
    setSearchResults([]);
  };

  const canCompare = useMemo(
    () => Boolean(selectedCars.left && selectedCars.right),
    [selectedCars.left, selectedCars.right]
  );

  const handleCompare = async () => {
    if (!canCompare) return;
    setCompareLoading(true);
    setComparison("");
    setCompareError("");

    try {
      const res = await client.post("/ai/compare-cars", {
        carA: selectedCars.left,
        carB: selectedCars.right,
      });
      const payload =
        res.data?.comparison || res.data?.result || res.data?.message || "";
      if (payload) {
        setComparison(payload);
      } else {
        setComparison(
          "Comparison generated. Review the vehicle specs side-by-side to understand the key differences."
        );
      }
    } catch (err) {
      console.error("Failed to compare cars", err);
      setCompareError(
        err?.response?.data?.message || err.message || "Unable to compare the selected cars"
      );
      if (!err?.response?.data?.message && !err?.message) {
        setComparison(
          "Comparison request sent. Please check back in a moment for the detailed analysis."
        );
      }
    } finally {
      setCompareLoading(false);
    }
  };

  const renderSelectionCard = (slotKey) => {
    const car = selectedCars[slotKey];
    return (
      <button
        onClick={() => setActiveSlot(slotKey)}
        className="flex-1 min-h-[260px] border border-dashed border-orange-500/60 rounded-2xl bg-gradient-to-b from-gray-900/80 to-black/80 text-white hover:border-orange-400 hover:shadow-[0_10px_40px_rgba(249,115,22,0.25)] transition-all relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_top,_#f97316_0%,_transparent_35%)]" />
        <div className="h-full flex flex-col items-center justify-center gap-4 px-4 text-center">
          {car ? (
            <div className="space-y-2">
              <div className="text-sm uppercase tracking-wide text-orange-300">Selected</div>
              <div className="text-2xl font-semibold">{car.make} {car.model}</div>
              <div className="text-sm text-gray-300 flex items-center justify-center gap-2">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">{car.year || "—"}</span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/10">{car.category || car.type || "—"}</span>
              </div>
              <div className="text-gray-400 text-sm">
                {car.price ? `$${Number(car.price).toLocaleString()}` : "Price unavailable"}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full border border-orange-500/70 flex items-center justify-center bg-orange-500/10 text-orange-300">
                <FaPlus size={24} />
              </div>
              <div className="text-lg font-medium">Add a car to compare</div>
              <p className="text-sm text-gray-400 max-w-xs">
                Tap to search our catalog and pick a vehicle for this slot.
              </p>
            </div>
          )}
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-black text-white">
      <UserNavBar />
      <main className="flex-1 pt-28 pb-16 px-4 sm:px-6 lg:px-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <p className="text-orange-400 uppercase tracking-[0.3em] text-xs">Compare</p>
            <h1 className="text-4xl font-bold mt-2 mb-3 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">
              Choose two cars and let AI break down the differences
            </h1>
            <p className="text-gray-400 max-w-3xl mx-auto">
              Select two vehicles to see how they stack up on performance, pricing, efficiency, and more. We will query ChatGPT to analyze the specs for you.
            </p>
          </div>

          <div className="grid md:grid-cols-[1fr_auto_1fr] gap-4 items-center mb-10">
            {renderSelectionCard("left")}
            <div className="hidden md:flex flex-col items-center gap-3 text-orange-400">
              <div className="w-12 h-12 rounded-full border border-orange-500/70 flex items-center justify-center bg-orange-500/10">
                <FaBalanceScale />
              </div>
              <span className="text-sm text-gray-300">VS</span>
            </div>
            <div className="md:hidden flex items-center justify-center text-orange-400 font-semibold">VS</div>
            {renderSelectionCard("right")}
          </div>

          <div className="flex justify-center mb-8">
            <button
              onClick={handleCompare}
              disabled={!canCompare || compareLoading}
              className={`px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-black ${
                canCompare
                  ? "bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 hover:scale-[1.02]"
                  : "bg-gray-800 text-gray-500 cursor-not-allowed"
              } ${compareLoading ? "opacity-80" : ""}`}
            >
              {compareLoading ? "Comparing with ChatGPT..." : "Compare with ChatGPT"}
            </button>
          </div>

          {(comparison || compareError) && (
            <div className="bg-gray-900/70 border border-gray-800 rounded-2xl p-6 shadow-xl space-y-3">
              <div className="flex items-center gap-2 text-orange-400 font-semibold">
                <FaBalanceScale />
                <span>Comparison summary</span>
              </div>
              {compareError && <p className="text-red-400 text-sm">{compareError}</p>}
              {comparison && <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">{comparison}</p>}
            </div>
          )}
        </div>
      </main>
      <Footer />

      {activeSlot && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-gray-950 w-full max-w-3xl rounded-2xl border border-gray-800 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_top_left,_#f97316_0%,_transparent_25%)]" />
            <div className="relative p-5 sm:p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">Search a car</h2>
                <button
                  onClick={() => setActiveSlot(null)}
                  className="text-gray-400 hover:text-white"
                  aria-label="Close search"
                >
                  <FaTimes />
                </button>
              </div>
              <div className="relative mb-4">
                <FaSearch className="absolute left-3 top-3 text-orange-400" />
                <input
                  autoFocus
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search by make, model, or keyword"
                  className="w-full bg-gray-900 border border-gray-700 rounded-xl pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500 text-white"
                />
              </div>

              <div className="min-h-[240px] bg-black/40 border border-gray-800 rounded-xl p-3 space-y-3">
                {searchLoading && <p className="text-sm text-gray-300">Loading cars...</p>}
                {searchError && <p className="text-sm text-red-400">{searchError}</p>}
                {!searchLoading && !searchError && searchResults.length === 0 && (
                  <p className="text-sm text-gray-400">No cars found. Try a different search term.</p>
                )}

                <div className="grid sm:grid-cols-2 gap-3">
                  {searchResults.map((car) => (
                    <button
                      key={car._id || car.id}
                      onClick={() => handleSelectCar(car)}
                      className="text-left bg-gray-900/70 border border-gray-800 hover:border-orange-500 rounded-xl p-3 flex gap-3 items-start transition"
                    >
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-800 flex-shrink-0">
                        {car.image || (Array.isArray(car.images) && car.images[0]) ? (
                          <img
                            src={car.image || car.images?.[0]}
                            alt={`${car.make} ${car.model}`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">
                            No image
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-1">
                        <div className="font-semibold text-white">{car.make} {car.model}</div>
                        <div className="text-xs text-gray-400 flex gap-2">
                          <span className="px-2 py-1 bg-white/5 rounded-full border border-white/10">{car.year || "—"}</span>
                          <span className="px-2 py-1 bg-white/5 rounded-full border border-white/10">{car.category || car.type || "—"}</span>
                        </div>
                        <div className="text-sm text-orange-300 font-medium">
                          {car.price ? `$${Number(car.price).toLocaleString()}` : "Price unavailable"}
                        </div>
                        <div className="text-xs text-gray-400 line-clamp-2">
                          {car.description || "No description provided."}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Compare;
