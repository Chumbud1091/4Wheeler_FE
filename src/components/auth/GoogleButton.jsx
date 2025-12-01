import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { AiOutlineGooglePlus } from "react-icons/ai";
import { app } from "../../../firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { loginStyles, signupStyles } from "../../assets/dummyStyles";

const GoogleButton = ({ variant }) => {
  const navigate = useNavigate();
  const { loginWithGoogle, loading } = useAuth();

  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({ prompt: "select_account" });

      const auth = getAuth(app);
      

      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      const fallbackProfile = {
        uid: result.user.uid,
        name: result.user.displayName,
        email: result.user.email,
        photo: result.user.photoURL,
      };

      await loginWithGoogle(idToken, fallbackProfile);

      navigate("/");
    } catch (err) {
      console.error("could not sign in with google", err);
    }
  };

  return (
    <button
      onClick={handleGoogleClick}
      type="button"
      className={`${variant.form.submitButton} flex items-center justify-center gap-2`}
      disabled={loading}
    >
      <AiOutlineGooglePlus className="text-xl" />
      <span className={variant.form.buttonText}>
        {loading ? "Signing in..." :  "CONTINUE WITH GOOGLE"}
      </span>
    </button>
  );
}

export default GoogleButton;
