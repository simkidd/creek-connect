import React, { useState } from "react";
import auth from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Added loading state

  const validateEmail = (email) => {
    // Email validation using regex pattern
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }

    // Domain checking
    const allowedDomains = [
      "gmail.com",
      "ymail.com",
      "yahoo.com",
      "example.com",
    ]; // Add your allowed domains here
    const domain = email.split("@")[1];

    return allowedDomains.includes(domain);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ fullName: "", email: "", password: "" });

    let hasError = false;

    if (!fullName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        fullName: "Full Name is required.",
      }));
      hasError = true;
    }

    if (!validateEmail(email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please enter a valid email address.",
      }));
      hasError = true;
    }

    if (!password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password is required.",
      }));
      hasError = true;
    } else if (password.length < 6) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password should be at least 6 characters long.",
      }));
      hasError = true;
    }

    if (hasError) {
      return;
    }

    try {
      setIsLoading(true); // Start loading

      // Create user account with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Access the newly created user account
      const newUser = userCredential.user;

      // Update the user's display name with full name
      await updateProfile(newUser, {
        displayName: fullName,
      });

      setUser(newUser);
      setIsLoading(false); // Stop loading

      // Additional logic after successful sign-up (e.g., redirect, show success message)
    } catch (error) {
      console.log(error.code);
      if (error.code === "auth/email-already-in-use") {
        setErrors((prevErrors) => ({
          ...prevErrors,
          email: "Email is already in use.",
        }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, password: error.message }));
      }
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="signUp__">
      <div className="login__wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input__container">
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && (
              <span className="error__message">{errors.fullName}</span>
            )}
          </div>
          <div className="input__container">
            <input
              type="email"
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
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
        {user && (
          <span className="success__message">Signed up successfully!</span>
        )}
      </div>
    </div>
  );
};

export default SignUp;
