import React, { useState } from "react";
import { auth, db, storage } from "../../firebase";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Add from "../../assets/addAvatar.png";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState("");
  const [errors, setErrors] = useState({
    displayName: "",
    email: "",
    password: "",
  });
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false); // Added loading state
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

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

  const togglePswShow = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({ displayName: "", email: "", password: "" });

    let hasError = false;

    if (!displayName) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        displayName: "Display name is required.",
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
      const res = await createUserWithEmailAndPassword(auth, email, password);

      // Access the newly created user account
      const newUser = res.user;

      if (file) {
        //Create a unique image name
        const date = new Date().getTime();
        const storageRef = ref(storage, `${displayName + date}`);

        await uploadBytesResumable(storageRef, file).then(() => {
          getDownloadURL(storageRef).then(async (downloadURL) => {
            try {
              // Update the user's profile
              await updateProfile(newUser, {
                displayName,
                photoURL: downloadURL,
              });
              //create user on firestore
              await setDoc(doc(db, "users", newUser.uid), {
                uid: newUser.uid,
                displayName,
                email,
                photoURL: downloadURL,
              });
              //create empty user chats on firestore
              await setDoc(doc(db, "userChats", newUser.uid), {});
            } catch (error) {
              console.log(error);
            }
          });
        });
      } else {
        // Update the user's profile
        await updateProfile(newUser, {
          displayName,
        });
        //create user on firestore
        await setDoc(doc(db, "users", newUser.uid), {
          uid: newUser.uid,
          displayName,
          email,
        });
        //create empty user chats on firestore
        await setDoc(doc(db, "userChats", newUser.uid), {});
      }

      setUser(newUser);
      setIsLoading(false); // Stop loading
      // Additional logic after successful sign-up (e.g., redirect, show success message)
      navigate('/login')
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

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  return (
    <div className="signUp__">
      <div className="login__wrapper">
        <form onSubmit={handleSubmit}>
          <div className="input__container">
            <input
              className={errors.displayName && "error"}
              type="text"
              placeholder="Display name"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
            />
            {errors.displayName && (
              <span className="error__message">{errors.displayName}</span>
            )}
          </div>
          <div className="input__container">
            <input
              className={errors.email && "error"}
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
              className={errors.password && "error"}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="psw__toggle" onClick={togglePswShow}>
              {showPassword ? <BsEyeSlash /> : <BsEye />}
            </span>
            {errors.password && (
              <span className="error__message">{errors.password}</span>
            )}
          </div>
          <div className="add__photo">
            <input
              type="file"
              id="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
            />
            <label htmlFor="file" className="addPhoto__label">
              <img src={Add} alt="" className="addPhoto__icon" />
              <span>{file ? "Change Photo" : "Add Photo"}</span>
            </label>
            {file && (
              <div className="selectedPhoto__container">
                <img
                  src={URL.createObjectURL(file)}
                  alt="Selected"
                  className="selectedPhoto__img"
                />
              </div>
            )}
            <div></div>
          </div>
          <div className="btn__container">
            <button type="submit" disabled={isLoading}>
              {isLoading ? "Signing up..." : "Sign Up"}
            </button>
          </div>
        </form>
        {isLoading && "Uploading and compressing the image please wait..."}
        {user && (
          <span className="success__message">Signed up successfully!</span>
        )}
      </div>
    </div>
  );
};

export default SignUp;
