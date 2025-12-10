import { useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaCalendarCheck, FaTimes } from "react-icons/fa";

import { useAuth } from "../../../hooks/useAuth";
import client from "../../../services/client";
import { toastError, toastSuccess } from "../../utils/toastUtils";

const inputClass =
  "w-full bg-gray-900/80 border border-white/10 rounded-lg px-4 py-3 text-sm text-gray-100 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500";

const labelClass = "text-sm font-medium text-gray-200";

const BookTestDriveButton = ({ carId, carName }) => {
  const { isLoggedIn, currentUser } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    preferredDate: "",
    message: "",
  });

  const defaultName = useMemo(() => currentUser?.username || "", [currentUser]);

  const openModal = () => {
    if (!isLoggedIn) {
      toastError("Please log in to book a test drive.");
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    setFormData((prev) => ({
      ...prev,
      name: prev.name || defaultName,
    }));
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!carId) {
      toastError("Missing car information for booking.");
      return;
    }
    if (!formData.name.trim() || !formData.phone.trim()) {
      toastError("Name and phone number are required.");
      return;
    }

    setSubmitting(true);
    try {
      await client.post("/cars/test-drive/", {
        name: formData.name.trim(),
        phone: formData.phone.trim(),
        preferredDate: formData.preferredDate || undefined,
        message: formData.message || "",
      });
      toastSuccess("Test drive request submitted!");
      setIsOpen(false);
      setFormData({
        name: defaultName,
        phone: "",
        preferredDate: "",
        message: "",
      });
    } catch (err) {
      const message =
        err?.response?.data?.message ||
        err?.message ||
        "Failed to submit test drive request.";
      toastError(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <button
        onClick={openModal}
        className="w-full mt-4 inline-flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold py-3 px-4 shadow-lg hover:opacity-90 transition"
      >
        <FaCalendarCheck />
        Book a Test Drive
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative w-full max-w-lg rounded-2xl bg-[#0B1220] border border-white/10 shadow-2xl p-6">
            <button
              onClick={closeModal}
              className="absolute top-3 right-3 text-gray-400 hover:text-white"
              aria-label="Close"
            >
              <FaTimes />
            </button>

            <h3 className="text-xl font-semibold text-white mb-1">Book a Test Drive</h3>
            <p className="text-sm text-gray-400 mb-4">
              {carName ? `You're booking a test drive for ${carName}.` : "Share your details and we will contact you to confirm your test drive."}
            </p>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="space-y-2">
                <label className={labelClass} htmlFor="name">
                  Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label className={labelClass} htmlFor="phone">
                  Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label className={labelClass} htmlFor="preferredDate">
                  Preferred Date
                </label>
                <input
                  id="preferredDate"
                  name="preferredDate"
                  type="date"
                  value={formData.preferredDate}
                  onChange={handleChange}
                  className={inputClass}
                />
              </div>

              <div className="space-y-2">
                <label className={labelClass} htmlFor="message">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Share anything else we should know"
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full flex items-center justify-center rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-4 transition disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? "Sending..." : "Submit Request"}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default BookTestDriveButton;
