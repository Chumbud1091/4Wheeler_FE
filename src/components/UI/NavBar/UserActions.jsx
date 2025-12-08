import { Link } from "react-router-dom";
import { FaUser, FaSignOutAlt, FaIdBadge } from "react-icons/fa";
import { navbarStyles as styles } from "../../../assets/dummyStyles";

const UserActions = ({ isLoggedIn, currentUser, onLogout }) => {
  return (
    <div className={styles.userActions}>
      {isLoggedIn ? (
        <>
          <Link
            to="/profile"
            className={styles.authButton}
            aria-label="Profile"
            title={currentUser?.name || "Profile"}
          >
            <FaIdBadge className="text-base" />
            <span className={styles.authText}>Profile</span>
          </Link>

          <button
            onClick={onLogout}
            className={styles.authButton}
            aria-label="Logout"
            title={currentUser?.name || "Logout"}
          >
            <FaSignOutAlt className="text-base" />
            <span className={styles.authText}>Logout</span>
          </button>
        </>
      ) : (
        <Link to="/login" className={styles.authButton} aria-label="Login">
          <FaUser className="text-base" />
          <span className={styles.authText}>Login</span>
        </Link>
      )}
    </div>
  );
};

export default UserActions;
