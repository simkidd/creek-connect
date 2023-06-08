import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/logo-2.png";
import Line from "../../assets/Group 1.png";
import LandingImg from "../../assets/landing.png";
import "./landing.scss";

const Landing = () => {
  return (
    <div className="landing">
      <div className="landing__wrap">
        <div className="nav__wrap">
          <div className="logo">
            <Link to="/">
              <img src={Logo} alt="logo" />
            </Link>
          </div>
          <ul className="nav__links">
            <li>
              <Link to="/">About Us</Link>
            </li>
            <li>
              <Link to="/">Contact Us</Link>
            </li>
            <li>
              <Link to="/login" className="login__btn">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="signIn__btn">
                Sign Up
              </Link>
            </li>
          </ul>
        </div>

        <div className="landing__body">
          <div className="landing__body__left">
            <div className="text__wrap">
              <h1>Welcome to the</h1>
              <h1>Home of the Future</h1>
            </div>
            <div className="line">
              <img src={Line} alt="" />
            </div>
          </div>
          <div className="landing__body__right">
            <div></div>
            <div className="img__wrap">
              <img src={LandingImg} alt="" />
              <p>Learn, Build, Connect</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;
