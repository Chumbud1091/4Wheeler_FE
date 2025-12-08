import { useEffect, useState } from "react";
import client from "../services/client";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

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

  if (!currentUser) return <div className="text-white p-6">Please login.</div>;

  return (
    <div className="text-white p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Profile</h1>

      <div className="bg-gray-800 p-5 rounded mb-8">
        <p><strong>Username:</strong> {currentUser.username}</p>
        <p><strong>Email:</strong> {currentUser.email}</p>
        <p><strong>User ID:</strong> {currentUser._id}</p>
      </div>

      <h2 className="text-2xl font-semibold mb-4">Favorite Cars</h2>

      {favorites.length === 0 ? (
        <p>No favorite cars yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {favorites.map((car) => (
            <Link
              to={`/cars/${car._id}`}
              state={{ car }}
              key={car._id}
              className="bg-gray-900 p-4 rounded shadow hover:bg-gray-700"
            >
              <p className="font-bold">{car.make} {car.model}</p>
              <p>{car.year}</p>
              <p>${car.price?.toLocaleString()}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
