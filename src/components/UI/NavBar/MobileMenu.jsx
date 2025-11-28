
import { Link, useLocation } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { navbarStyles as styles } from "../../../assets/dummyStyles";
import { navLinks } from "./navLinksData";

const MobileMenu = ({ isOpen, menuRef, onClose, isLoggedIn, onLogout }) => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div
      id="mobile-menu"
      ref={menuRef}
      className={`${styles.mobileMenu.container} ${
        isOpen ? styles.mobileMenu.open : styles.mobileMenu.closed
      }`}
      aria-hidden={!isOpen}
    >
      <div className={styles.mobileMenuInner}>
        <div className="px-4 pt-3 pb-4 space-y-2">
          <div className={styles.mobileGrid}>
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={onClose}
                className={`${styles.mobileLink.base} ${
                  isActive(link.to)
                    ? styles.mobileLink.active
                    : styles.mobileLink.inactive
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className={styles.divider} />

          <div className="pt-1">
            {isLoggedIn ? (
              <button onClick={onLogout} className={styles.mobileAuthButton}>
                <FaSignOutAlt className="mr-3 text-base" />
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                onClick={onClose}
                className={styles.mobileAuthButton}
              >
                <FaUser className="mr-3 text-base" />
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
