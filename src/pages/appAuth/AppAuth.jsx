import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./appAuth.scss";
import Logo from "../../assets/logo-2.png";
import Line from "../../assets/Group 1.png";
import Connect from "../../assets/Lets-Connect!.png";

const AppAuth = () => {
  return (
    <div className="app__auth">
      <div className="auth__header">
        <div className="header__nav">
          <div className="nav__wrap">
            <div className="logo">
              <Link to="/">
                <img src={Logo} alt="logo" />
              </Link>
            </div>
            <ul className="nav__links">
              <li>
                <Link to="">About Us</Link>
              </li>
              <li>
                <Link to="">Contact Us</Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="auth__nav">
          <li>
            <Link to="register">Sign Up</Link>
          </li>
          <li>
            <Link to="login">Login</Link>
          </li>
        </div>
      </div>
      <div className="side__img">
        <img src={Connect} alt="" />
        <img src={Line} alt="" />
      </div>
      <div className="auth__content">
        <div className="outlet__container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppAuth;
