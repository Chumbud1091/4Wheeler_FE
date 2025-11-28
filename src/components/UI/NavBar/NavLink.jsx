
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { navbarStyles as styles } from "../../../assets/dummyStyles";
import { navLinks } from "./navLinksData";

const NavLinks = () => {
  const location = useLocation();

  const isActive = (path) => {
    if (path === "/") return location.pathname === "/";
    return location.pathname.startsWith(path);
  };

  return (
    <div className={styles.navLinksContainer}>
      <div className={styles.navLinksInner}>
        {navLinks.map((link, index) => (
          <React.Fragment key={link.to}>
            <Link
              to={link.to}
              className={`${styles.navLink.base} ${
                isActive(link.to)
                  ? styles.navLink.active
                  : styles.navLink.inactive
              }`}
            >
              {link.label}
            </Link>

            {index < navLinks.length - 1 && (
              <div className={styles.separator} aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default NavLinks;
