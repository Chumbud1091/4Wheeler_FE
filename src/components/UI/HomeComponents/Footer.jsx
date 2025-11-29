import React from "react";
import { Link } from "react-router-dom";
import { footerStyles as styles } from "../../../assets/dummyStyles";
import logo from "../../../assets/logocar.png";
import { FaMapMarkedAlt, FaPhone, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube } from "react-icons/fa";
import { GiCarKey } from "react-icons/gi";
import { navLinks } from "../../UI/NavBar/navLinkData";

const Footer = () => {
  return (
    <footer className={styles.container}>
      <div className={styles.topElements}>
        <div className={styles.circle1} />
        <div className={styles.circle2} />
        <div className={styles.roadLine} />
      </div>

      <div className={styles.innerContainer}>
        <div className={styles.grid}>
          <div className={styles.brandSection}>
            <Link to="/" className="flex items-center">
              <div className={styles.logoContainer}>
                <img
                  src={logo}
                  alt="logo"
                  className="h-[1em] w-auto block object-contain"
                />
                <span className={styles.logoText}>4Wheeler</span>
              </div>
            </Link>
            <p className={styles.description}>
              Premium car rental service with the latest models and exceptional
              customer services. Drive your dream car today!
            </p>

            <div className={styles.socialIcons}>
              {[FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaYoutube].map((Icon, i) => (
                <a href="#" key={i} className={styles.socialIcon}>
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className={styles.sectionTitle}>
              Quick Links
            </h3>

            <ul className={styles.linkList}>
              {navLinks.map((link, i) => (
                <li key={i}>
                  <Link to={link.to} className={styles.linkItem}>
                    <span className={styles.bullet}></span>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className={styles.sectionTitle}>
              Contact Us
              <span className={styles.underline} />
            </h3>

            <ul className={styles.contactList}>
              <li className={styles.contactItem}>
                <FaMapMarkedAlt className={styles.contactIcon} />
                <span>123 Tan Son Nhat, Ho Chi Minh City</span>
              </li>

              <li className={styles.contactItem}>
                <FaPhone className={styles.contactIcon} />
                <span>+81 0799431275</span>
              </li>

              <li className={styles.contactItem}>
                <FaEnvelope className={styles.contactIcon} />
                <span>support@4wheeler  .com</span>
              </li>
            </ul>
            <div className={styles.hoursContainer}>
            <h4 className={styles.hoursTitle}>Business Hours</h4>
            <div className={styles.hoursText}>
              <p>Monday - Friday: 8:00 AM - 8:00 PM</p>
              <p>Saturday: 9:00 AM - 6:00 PM</p>
              <p>Sunday: 10:00 AM - 4:00 PM</p>
            </div>
          </div>
          </div>



          <div>
            <h3 className={styles.sectionTitle}>
              Newsletter
              <span className={styles.underline}></span>
            </h3>

            <p className={styles.newsletterText}>
              Subscribe for special offers and updates
            </p>

            <form className="space-y-3">
              <input
                type="email"
                placeholder="Your Email Address"
                className={styles.input}
              />

              <button type="submit" className={styles.subscribeButton}>
                <GiCarKey className="mr-2 text-lg sm:text-xl" />
                Subscribe Now
              </button>
            </form>
          </div>
        </div>

        <div className={styles.copyright}>
          <p>
            &copy; {new Date().getFullYear()} 4Wheeler. All rights reserved.
          </p>

          <p className="mt-3 md:mt-0">
            Designed by{" "}
            <a
              href="https://4wheelersupportservices.com"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.designerLink}
            >
              4Wheeler Digital Services
            </a>
          </p>
        </div>
      </div>
    </footer >
  );
};

export default Footer;
