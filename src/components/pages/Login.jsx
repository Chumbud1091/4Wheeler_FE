import React, { useEffect, useState } from 'react';
import { loginStyles as styles } from '../../assets/dummyStyles';
import { FaArrowLeft, FaEyeSlash, FaLock, FaUser, FaEye } from 'react-icons/fa';
import logo from '../../assets/logocar.png';
import { toastSuccess, toastError } from '../utils/toastUtils';
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import GoogleButton from '../auth/GoogleButton';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, loading, error } = useAuth();
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => {
    setIsActive(true);
  }, []);
  const handleChange = (e) => {
    setCredentials((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(credentials.email, credentials.password);

      toastSuccess("Login Successful! Welcome back", () => {
        const redirectPath = location.state?.from || "/";
        navigate(redirectPath, { replace: true });
      });
    } catch (err) {
      toastError(error || "Login Failed! Please check your credentials.");
    }
  };


  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.animatedBackground.base}>
        <div className={`${styles.animatedBackground.orb1} ${isActive ? 'translate-x-20 translate-y-10' : ''}`} />
        <div className={`${styles.animatedBackground.orb2} ${isActive ? '-translate-x-20 -translate-y-10' : ''}`} />
        <div className={`${styles.animatedBackground.orb3} ${isActive ? '-translate-x-10 translate-y-20' : ''}`} />
      </div>

      <Link to="/" className={styles.backButton}>
        <FaArrowLeft className="text-sm sm:text-base" />
        <span className="font-medium text-xs sm:text-sm">Back to Home</span>
      </Link>


      <div
        className={` ${styles.loginCard.container} ${isActive ? "scale-100 opacity-100" : "scale-90 opacity-0"}
  `}
      >
        <div className={styles.loginCard.card}>
          <div className={styles.loginCard.decor1} />
          <div className={styles.loginCard.decor2} />

          {/* Logo */}
          <div className={styles.loginCard.headerContainer}>
            <div className={styles.loginCard.logoContainer}>
              <div className={styles.loginCard.logoText}>
                <img
                  src={logo}
                  alt="logo"
                  className="h-[1em] w-auto block"
                  style={{
                    display: "block",
                    objectFit: "contain",
                  }}
                />
                <span className="font-bold tracking-wider">4Wheeler</span>
              </div>
            </div>

            {/* header for shows */}
            <h1 className={styles.loginCard.title}>
              PremeumDrive
            </h1>
            <p className={styles.loginCard.subtitle}>
              Luxury driving experience awaits
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className={styles.form.container}>
            <div className={styles.form.inputContainer}>
              <div className={styles.form.inputWrapper}>
                <div className={styles.form.inputIcon}>
                  <FaUser />
                </div>
                <input
                  type="email"
                  name="email"
                  value={credentials.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                  className={styles.form.input}
                />
              </div>
            </div>

            <div className={styles.form.inputContainer}>
              <div className={styles.form.inputWrapper}>
                <div className={styles.form.inputIcon}>
                  <FaLock />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={credentials.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className={styles.form.input}
                />
                <div onClick={togglePasswordVisibility} className={styles.form.passwordToggle}>
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>

            <button
              type="submit"
              className={styles.form.submitButton}
              disabled={loading}
            >
              <span className={styles.form.buttonText}>
                {loading ? "Signing in..." : "ACCESS LIMITLESS"}
              </span>
              <div className={styles.form.buttonHover}></div>
            </button>

            <GoogleButton />

            <div className={styles.signupSection}>
              <div className={styles.signupText}>
                Don't have an account?
              </div>
              <Link to="/signup" className={styles.signupButton}> CREATE ACCOUNT </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
