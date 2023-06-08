import React from "react";
import "./login.scss";

const Login = () => {
  return (
    <div className="login__">
      <div className="login__wrapper">
        <form>
          <div className="input__container">
            <input type="text" placeholder="Email" />
          </div>
          <div className="input__container">
            <input type="password" placeholder="Password" />
          </div>
          <div className="btn__container">
            <button type="submit">Log In</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
