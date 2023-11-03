import React from "react";
import { Checkbox, Button } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import "../assets/css/Login.css";

function Login() {
  return (
    <div className="login-main">
      <div className="login-left">
        <h1 className="login-head">Login</h1>
        <input type="text" className="login-name" placeholder="Username" />
        <input type="password" className="login-pass" placeholder="Password" />
        <div className="login-right">
          <Checkbox />
          <p>Remember Me</p>
          <p>Forgot Password</p>
        </div>
        <Button color="blcak" appearance="primary">
          Login
        </Button>
      </div>
      <div className="login-right"></div>
    </div>
  );
}

export default Login;
