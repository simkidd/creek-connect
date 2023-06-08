import React, { useState } from "react";
import auth from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

const SignUp = () => {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    try {
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

      // Additional logic after successful sign-up (e.g., redirect, show success message)
    } catch (error) {
      setError(error.message);
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
          </div>
          <div className="input__container">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input__container">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input__container">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="btn__container">
            <button type="submit">Sign Up</button>
          </div>
        </form>
        {error && <div className="error__message">{error}</div>}
      </div>
    </div>
  );
};

export default SignUp;
