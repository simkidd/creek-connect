import React from "react";

const SignUp = () => {
  return (
    <div className="signUp__">
      <div className="login__wrapper">
        <form>
          <div className="input__container">
            <input type="text" placeholder="Full Name" />
          </div>
          <div className="input__container">
            <input type="text" placeholder="Username" />
          </div>
          <div className="input__container">
            <input type="email" placeholder="Email" />
          </div>
          <div className="input__container">
            <input type="password" placeholder="Password" />
          </div>
          <div className="btn__container">
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
