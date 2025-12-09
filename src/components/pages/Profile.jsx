import { useEffect, useState } from "react";
import client from "../../services/client";
import { useAuth } from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import UserNavBar from "../UI/NavBar/UserNavBar";
import Footer from "../UI/Footer/Footer";

const Profile = () => {
  const { currentUser } = useAuth();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await client.get("/auth/users/profile");
        setFavorites(res.data?.user?.favorites || []);
      } catch (err) {
        console.error(err);
      }
    };
    load();
  }, []);

  return (
    <>
      <UserNavBar />

      <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
        <div className="max-w-6xl mx-auto px-4 py-16 space-y-10">
          {/* Header / user info */}
          <section className="space-y-6">
            <div className="inline-flex items-center gap-3 px-4 py-1 rounded-full bg-orange-500/10 border border-orange-500/40">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              <p className="text-xs uppercase tracking-[0.25em] text-orange-300">
                YOUR GARAGE · PROFILE
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 items-stretch">
              <div className="md:col-span-2 bg-slate-900/70 border border-white/10 rounded-3xl p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.7)]">
                <h1 className="text-2xl sm:text-3xl font-bold mb-3">
                  Welcome back,{" "}
                  <span className="text-orange-300">
                    {currentUser?.username || "Driver"}
                  </span>
                </h1>
                <p className="text-sm sm:text-base text-gray-300 mb-4">
                  This is your personal space inside{" "}
                  <span className="text-orange-300 font-medium">
                    4Wheeler · PremiumDrive
                  </span>
                  . You can review your profile details and quickly access the
                  cars you’ve marked as favorites.
                </p>

                <div className="space-y-2 text-sm sm:text-base">
                  <p>
                    <span className="text-gray-400 mr-2">Username:</span>
                    <span className="font-medium text-white">
                      {currentUser?.username}
                    </span>
                  </p>
                  <p>
                    <span className="text-gray-400 mr-2">Email:</span>
                    <span className="font-medium text-white">
                      {currentUser?.email}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    User ID: <span className="font-mono">{currentUser?._id}</span>
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/60 border border-orange-500/40 rounded-3xl p-5 flex flex-col justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-orange-300 mb-2">
                    QUICK ACCESS
                  </p>
                  <p className="text-sm text-gray-200 mb-4">
                    Head back to the showroom and explore more cars that might
                    earn a place in your favorites.
                  </p>
                </div>
                <Link
                  to="/cars"
                  className="mt-3 inline-flex items-center justify-center px-4 py-2.5 rounded-full bg-gradient-to-r from-orange-500 to-orange-600 text-xs sm:text-sm font-semibold hover:opacity-90 transition shadow-lg shadow-orange-500/30"
                >
                  Explore Premium Collection
                </Link>
              </div>
            </div>
          </section>

          {/* Favorites */}
          <section className="space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h2 className="text-xl sm:text-2xl font-semibold">
                Your favorite cars
              </h2>
              {favorites.length > 0 && (
                <span className="text-xs sm:text-sm text-gray-400">
                  {favorites.length} saved{" "}
                  {favorites.length === 1 ? "model" : "models"}
                </span>
              )}
            </div>

            {favorites.length === 0 ? (
              <div className="bg-slate-900/70 border border-dashed border-white/15 rounded-2xl p-6 text-sm sm:text-base text-gray-300">
                You haven’t added any favorite cars yet. Browse the{" "}
                <Link
                  to="/cars"
                  className="text-orange-300 underline underline-offset-4"
                >
                  Premium Car Collection
                </Link>{" "}
                and tap the heart icon on models you love to see them here.
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {favorites.map((car) => (
                  <Link
                    to={`/cars/${car._id}`}
                    state={{ car }}
                    key={car._id}
                    className="group bg-slate-900/70 border border-white/10 rounded-2xl p-4 hover:border-orange-400/70 hover:-translate-y-1 transition transform shadow-[0_12px_40px_rgba(0,0,0,0.6)]"
                  >
                    <div className="mb-3">
                      <p className="text-sm text-gray-400 uppercase tracking-wide">
                        {car.year} · {car.category || car.type || "Model"}
                      </p>
                      <p className="text-lg font-semibold">
                        {car.make} {car.model}
                      </p>
                    </div>
                    <p className="text-sm text-gray-300 mb-3 line-clamp-2">
                      {car.description || "A refined model from your favorites."}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-semibold text-orange-300">
                        {car.price
                          ? `$${car.price.toLocaleString()}`
                          : "Price on request"}
                      </span>
                      <span className="text-xs text-gray-400 group-hover:text-orange-200">
                        View details →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;
