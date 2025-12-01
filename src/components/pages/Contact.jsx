import React, { useState } from 'react'
import { contactPageStyles as styles } from '../../assets/dummyStyles';
import { FaMapMarkedAlt, FaWhatsapp, FaClock, FaEnvelope, FaCalendarAlt, FaUser, FaPhone, FaCar, FaComment } from 'react-icons/fa';
import { IoIosSend } from 'react-icons/io';
import BackGroundPartern from '../UI/ContactComponents/BackGroundPartern';
import {
  WHATSAPP_NUMBER,
  CONTACT_INFOS,
  CAR_TYPES,
  FIELD_CONFIG,
  FADE_IN_KEYFRAMES,
} from "../UI/ContactComponents/ContactConstain";
import Navbar from '../UI/NavBar/UserNavBar';
import Footer from '../UI/HomeComponents/Footer';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    carType: "",
    message: "",
  });
  const [activeField, setActiveField] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const phone = WHATSAPP_NUMBER.replace("+", "");
    const whatsappMessage =
      `Name: ${formData.name}%0A` +
      `Email: ${formData.email}%0A` +
      `Phone: ${formData.phone}%0A` +
      `Car Type: ${formData.carType}%0A` +
      `Message: ${formData.message}`;
    window.open(`https://wa.me/+918299431275?text=${whatsappMessage}`, '_blank');

    setFormData({ name: '', email: '', phone: '', carType: '', message: '' });
  };


  return (
    <> 
    <Navbar />
      <div className={styles.container}>
        <BackGroundPartern />

        {/* tittle */}
        <div className={styles.content}>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>Contact Our Team</h1>
            <div className={styles.divider} />
            <p className={styles.subtitle}>
              Have questions about our premium fleet? Our team is ready to assist
              with your car rental needs.
            </p>
          </div>


          <div className={styles.cardContainer}>
            <div className={styles.infoCard}>
              <div className={styles.infoCardCircle1}></div>
              <div className={styles.infoCardCircle2}></div>

              <div className="relative z-10 space-y-5">
                <h2 className={styles.infoTitle}>
                  <FaMapMarkedAlt className={styles.infoIcon} />Our information
                </h2>

                <div className={styles.infoItemContainer}>
                  {CONTACT_INFOS.map((info, i) => (
                    <div key={i} className={styles.infoItem}>
                      <div className={styles.iconContainer(info.color)}>
                        <info.icon className={
                          i === 0
                            ? "text-green-400"
                            : "text-orange-400 text-lg"
                        } />
                      </div>

                      <div>
                        <h3 className={styles.infoLabel}>
                          {info.label}
                        </h3>
                        <p className={styles.infoValue}>
                          {info.value}
                          {i === 2 && (
                            <span className="block text-gray-500">
                              Sunday: 8AM-2PM
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className={styles.offerContainer}>
                  <div className='flex items-center'>
                    <FaCalendarAlt className={styles.offerIcon} />
                    <span className={styles.offerTitle}>Special Offer!</span>
                    <p className={styles.offerText}>
                      Book for 3+ days and get 10% discount
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.formCard}>
              <div className={styles.formCircle1}></div>
              <div className={styles.formCircle2}></div>

              <div className='mb-4'>
                <h2 className={styles.formTitle}>
                  <IoIosSend className={styles.infoIcon} /> Send Your Inquiry
                </h2>
                <p className={styles.formSubtitle}>
                  Fill out the form and we'll get back to you promptly.
                </p>
              </div>

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGrid}>
                  {FIELD_CONFIG.map((field) =>
                    field.type === "select" ? (
                      <div key={field.name} className={styles.inputContainer}>
                        <div className={styles.inputIcon}>
                          <field.icon />
                        </div>

                        <select
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          onFocus={() => setActiveField(field.name)}
                          onBlur={() => setActiveField(null)}
                          required
                          className={styles.select(
                            activeField === field.name
                          )}
                        >
                          <option value="">{field.placeholder}</option>
                          {CAR_TYPES.map((opt) => (
                            <option
                              key={opt}
                              value={opt}
                              className="bg-gray-800 cursor-pointer"
                            >
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    ) : (
                      <div key={field.name} className={styles.inputContainer}>
                        <div className={styles.inputIcon}>
                          <field.icon />
                        </div>

                        <input
                          type={field.type}
                          name={field.name}
                          value={formData[field.name]}
                          onChange={handleChange}
                          onFocus={() => setActiveField(field.name)}
                          onBlur={() => setActiveField(null)}
                          required
                          placeholder={field.placeholder}
                          className={styles.input(
                            activeField === field.name
                          )}
                        />
                      </div>
                    )
                  )}
                </div>

                <div className="relative">
                  <div className={styles.textareaIcon}>
                    <FaComment />
                  </div>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    onFocus={() => setActiveField("message")}
                    onBlur={() => setActiveField(null)}
                    required
                    rows="8"
                    placeholder="Tell us about your needs ..."
                    className={styles.textarea(
                      activeField === "message"
                    )}
                  ></textarea>
                </div>

                <button type="submit" className={styles.submitButton}>
                  Send Message
                  <FaWhatsapp className={styles.whatsappIcon} />
                </button>
              </form>
            </div>
          </div>
        </div>
        <style>{FADE_IN_KEYFRAMES}</style>
      </div> 
      <Footer />
    </>
  );
};

export default Contact;