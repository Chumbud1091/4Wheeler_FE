import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";
import { FaArrowUp } from "react-icons/fa";
import { myBookingsStyles as s } from "./assets/dummyStyles";

import Home from "./components/pages/Home";
import Login from "./components/pages/Login.jsx";
import Contact from "./components/pages/Contact.jsx";
import About from "./components/pages/About.jsx";
import Profile from "./components/pages/Profile.jsx";
import SignUp from "./components/pages/SignUp.jsx";
import Cars from "./components/pages/Cars.jsx";
import CarPageDetails from "./components/pages/CarPageDetails.jsx";
import { useAuth } from "./hooks/useAuth";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location.pathname }}
      />
    );
  }
  return children;
};

const RedirectIfAuthenticated = ({ children }) => {
  const { isLoggedIn } = useAuth();
  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return children;
};


const App = () => {
  const [showButton, setShowButton] = useState(false);
  const location = useLocation();
  const { refreshSession } = useAuth();

  useEffect(() => {
    refreshSession();
  }, [refreshSession]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => setShowButton(window.scrollY > 300);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };


  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <RedirectIfAuthenticated>
              <Login />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/signup"
          element={
            <RedirectIfAuthenticated>
              <SignUp />
            </RedirectIfAuthenticated>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route path="/cars" element={<Cars />} />
        <Route path="/cars/:id" element={<CarPageDetails />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/contact"
          element={
            <ProtectedRoute>
              <Contact />
            </ProtectedRoute>
          }
        />
      </Routes>
      {showButton && (
        <button
          onClick={scrollUp}
          className="fixed cursor-pointer bottom-5 right-5 p-3 rounded-full bg-gradient-to-r from-orange-600 to-orange-700 text-white shadow-lg hover:opacity-90 transition z-10"
        >
          <FaArrowUp size={22} />
        </button>
      )}

      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
        toastStyle={{
          backgroundColor: "#fb923c",
          borderRadius: "12px",
          boxShadow: "0 4px 20px rgba(249, 115, 22, 0.25)",
        }}
      />
    </>
  );
};

export default App;
