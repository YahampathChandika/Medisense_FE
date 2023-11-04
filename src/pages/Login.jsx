import React from "react";
import { Checkbox, Button } from "rsuite";
import "rsuite/dist/rsuite-no-reset.min.css";
import "../assets/css/Login.css";
import { useNavigate  } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

function Login() {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const Toast = Swal.mixin({
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });

  const onSubmit = (data) => {
    console.log(data);

    if (data.username === "abc" && data.password === "123") {
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
      navigate("/")
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Incorrect Credentials !",
        showConfirmButton: false,
        timer: 2000,
      });
    }
  };

  return (
    <div className="login-main">
      <div className="login-main-con">
        <div className="login-left-con">
          <form className="login-left" onSubmit={handleSubmit(onSubmit)}>
            <h1 className="login-head">Login</h1>
            <input
              type="text"
              className="login-name"
              placeholder="Username"
              {...register("username")}
            />
            <input
              type="password"
              className="login-pass"
              placeholder="Password"
              {...register("password")}
            />
            <div className="login-left-mid">
              <Checkbox>Remember Me</Checkbox>
              <p className="login-left-mid-forgot">Forgot Password</p>
            </div>
            <Button appearance="primary" type="submit" className="login-btn">
              Login
            </Button>
          </form>
        </div>
        <div className="login-right"></div>
      </div>
    </div>
  );
}

export default Login;
