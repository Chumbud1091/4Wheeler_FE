import { useEffect, useState } from 'react'
import { signupStyles as styles } from '../../assets/dummyStyles'
import { Link, useNavigate } from 'react-router-dom'
import { FaArrowLeft, FaEnvelope, FaEye, FaLock, FaEyeSlash, FaCheck, FaUser } from 'react-icons/fa';
import logo from '../../assets/logocar.png';
import { toastError, toastSuccess } from '../utils/toastUtils';
import { useAuth } from "../../hooks/useAuth";
import GoogleButton from '../auth/GoogleButton';

const SignUp = () => {
  const navigate = useNavigate();
  const { signup, loading, error } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    setIsActive(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    })
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!acceptTerms) {
      toastError('You must accept the terms and conditions to sign up.', { theme: "dark" });
      return;
    }
    try {
      await signup(formData); // <- gọi useAuth.signup

      toastSuccess("Account created successfully!", {
        theme: "dark",
        onClose: () => {
          navigate("/login");
        },
      });
    } catch (err) {
      toastError(
        error || "Sign up failed! Please check your information.",
        { theme: "dark" }
      );
    }
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.animatedBackground.base}>
        <div
          className={`${styles.animatedBackground.orb1} ${isActive
            ? "translate-x-10 sm:translate-x-20 translate-y-5 sm:translate-y-10"
            : ""
            }`}
        ></div>
        <div
          className={`${styles.animatedBackground.orb2} ${isActive
            ? "-translate-x-10 sm:-translate-x-20 -translate-y-5 sm:-translate-y-10"
            : ""
            }`}
        ></div>
        <div
          className={`${styles.animatedBackground.orb3} ${isActive
            ? "-translate-x-5 sm:-translate-x-10 translate-y-10 sm:translate-y-20"
            : ""
            }`}
        ></div>
      </div>

      <Link to="/" className={styles.backButton}>
        <FaArrowLeft className="text-xs sm:text-sm group-hover:-translate-x-1 transition-transform" />
        <span className="font-medium text-xs sm:text-sm">Back to Home</span>
      </Link>

      <div className={`${styles.signupCard.container} ${isActive
        ? "scale-100 opacity-100" : "scale-90 opacity-0"
        }`}>
        <div
          className={styles.signupCard.card}
          style={{
            boxShadow: '0 15px 35px rgba(0, 0, 0, 0.37)',
            borderRadius: '30px',
          }}
        >
          <div className={styles.signupCard.decor1}></div>
          <div className={styles.signupCard.decor2}></div>

          <div className={styles.signupCard.headerContainer}>
            <div className={styles.signupCard.logoContainer}>
              <div className={styles.signupCard.logoText}>
                <img
                  src={logo}
                  alt="logo"
                  className="h-[1.2em] w-auto block object-contain"
                  style={{
                    display: "block",
                  }}
                />
                <span className="font-bold tracking-wider text-white mt-1">
                  4Wheeler
                </span>
              </div>
            </div>

            <h1 className={styles.signupCard.title}> Join PremiumDrive </h1>
            <p className={styles.signupCard.subtitle}>Create your exclusive account</p>
          </div>

          <form onSubmit={handleSubmit} className={styles.form.container}>
            <div className={styles.form.inputContainer}>
              <div className={styles.form.inputWrapper}>
                <div className={styles.form.inputBlur}><FaUser/></div>
                <div className={styles.form.inputIcon}>
                  <FaUser className="text-sm sm:text-base" />
                </div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={styles.form.input}
                  placeholder="Name"
                  required
                  style={{ borderRadius: "16px" }}
                />
              </div>
            </div>
            <div className={styles.form.inputContainer}>
              <div className={styles.form.inputWrapper}>
                <div className={styles.form.inputBlur}><FaEnvelope/></div>
                <div className={styles.form.inputIcon}>
                  <FaEnvelope className="text-sm sm:text-base" />
                </div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.form.input}
                  placeholder="Email"
                  required
                  style={{ borderRadius: "16px" }}
                />
              </div>
            </div>
            <div className={styles.form.inputContainer}>
              <div className={styles.form.inputWrapper}>
                <div className={styles.form.inputBlur}><FaLock/></div>
                <div className={styles.form.inputIcon}>
                  <FaLock className="text-sm sm:text-base" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={styles.form.input}
                  placeholder="Password "
                  required
                  style={{ borderRadius: "16px" }}
                />

                <div onClick={togglePasswordVisibility} className={styles.form.passwordToggle}>
                  {showPassword ? (
                    <FaEyeSlash className="text-sm sm:text-base" />
                  ) : (
                    <FaEye className="text-sm sm:text-base" />
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-start mt-2 sm:mt-3 md:mt-4">

              <div className="flex items-center h-5 mt-0.5 sm:mt-1">
                <input
                  type="checkbox"
                  id="terms"
                  name="terms"
                  checked={acceptTerms}
                  onChange={() => setAcceptTerms(!acceptTerms)}
                  className={styles.form.checkbox}
                  style={{ boxShadow: "none" }}
                />
              </div>

              <div className="ml-2 sm:ml-3 text-xs sm:text-sm">
                <label
                  htmlFor="terms"
                  className={styles.form.checkboxLabel}
                >
                  I agree to the{" "}
                  <span className={styles.form.checkboxLink}>
                    Terms & Conditions
                  </span>
                </label>
              </div>
            </div>

            <button type="submit" className={styles.form.submitButton} disabled={loading}>
              <span className={styles.form.buttonText}>
                <FaCheck className="text-white text-sm sm:text-base md:text-lg" />
                {loading ? "Signing up..." : "CREATE ACCOUNT  "}
              </span>
              <div className={styles.form.buttonHover}></div>
            </button>
            
            <GoogleButton variant={styles}/>

            <p className={styles.signinText}>Already have an account?</p>
            <Link 
              to="/login" 
              className={styles.signinButton}
              style={{
                borderRadius: "16px",
                boxShadow: "0 2px 10px rgba(245, 124, 0, 0.08)"
              }}
            >LOGIN TO YOUR ACCOUNT</Link>
          </form>
        </div>
      </div>
    </div>  
  )
}

export default SignUp
