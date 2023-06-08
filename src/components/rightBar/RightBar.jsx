import React from "react";
import "./rightBar.scss";
import { Link } from "react-router-dom";

const RightBar = () => {
  return (
    <div className="right__bar">
      <div className="right__container">
        <div className="right__profile">
          <div className="right__header">
            <Link className="avatar__wrapper">
              <img className="avatar" src="avatar2.png" alt="CurrentUser" />
            </Link>
          </div>
          <div></div>
        </div>
        <div className="rt__inner">
          <div className="avt__">
            <img className="avatar" src="avatar2.png" alt="Avatar" />
            <Link className="avatar__wrapper">
              <h3 className="name">John Doe</h3>
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
