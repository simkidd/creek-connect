import React, { useContext } from "react";
import "./rightBar.scss";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import { AuthContext } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";

const RightBar = () => {
  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    auth
      .signOut()
      .then(() => {
        // Sign out successful
        // You can add additional logic here, such as redirecting to a login page
        navigate("/login");
      })
      .catch((error) => {
        // An error occurred while signing out
        // You can handle the error or display an error message to the user
        console.error("Error signing out:", error);
      });
  };

  return (
    <div className="right__bar">
      <div className="right__container">
        <div className="right__profile">
          <div className="right__header">
            <Link className="avatar__wrapper">
              <img
                className="avatar"
                src={currentUser.photoURL}
                alt="CurrentUser"
              />
            </Link>
          </div>
          <div>{currentUser.displayName}</div>
          <div>
            <button onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
        <div className="rt__inner">
          <div className="avt__">
            <img className="avatar" src={data.user?.photoURL} alt="Avatar" />
            <Link className="avatar__wrapper">
              <h3 className="name">{data.user?.displayName}</h3>
            </Link>
          </div>
          <div className="msg__media">
            <h3>Photos and Multimedia</h3>
            <div className="media__grid">
              <div className="grid__item"></div>
              <div className="grid__item"></div>
              <div className="grid__item"></div>
              <div className="grid__item"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RightBar;
