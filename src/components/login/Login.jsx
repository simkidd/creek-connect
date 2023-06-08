import React, { useState } from "react";
import "./login.scss";
import { useNavigate } from "react-router-dom";
import auth from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ email: "", password: "" });

    let hasError = false;

    if (!email) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email is required.",
      }));
      hasError = true;
    }

    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required.",
      }));
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      setIsLoading(true)
      // Sign in with email and password
      await signInWithEmailAndPassword(auth, email, password);

      navigate("/");
    } catch (error) {
      // Handle login errors
      if (error.code === "auth/user-not-found") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "User not found. Please check your email.",
        }));
      } else if (error.code === "auth/wrong-password") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          password: "Incorrect password. Please try again.",
        }));
      } else {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: error.message,
        }));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login__">
      <div className="login__wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input__container">
            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && (
              <span className="error__message">{errors.email}</span>
            )}
          </div>
          <div className="input__container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && (
              <span className="error__message">{errors.password}</span>
            )}
          </div>
          <div className="btn__container">
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Logging in..." : "Log In"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
