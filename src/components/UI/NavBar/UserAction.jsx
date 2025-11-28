import { Link } from "react-router-dom";
import { FaUser, FaSignOutAlt } from "react-icons/fa";
import { navbarStyles as styles } from "../../../assets/dummyStyles";

const UserActions = ({ isLoggedIn, currentUser, onLogout }) => {
  return (
    <div className={styles.userActions}>
      {isLoggedIn ? (
        <button
          onClick={onLogout}
          className={styles.authButton}
          aria-label="Logout"
          title={currentUser?.name || "Logout"}
        >
          <FaSignOutAlt className="text-base" />
          <span className={styles.authText}>Logout</span>
        </button>
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
