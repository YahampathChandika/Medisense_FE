import React from "react";
import { Checkbox } from "rsuite";
import { Button } from "react-bootstrap";
import "rsuite/dist/rsuite-no-reset.min.css";
import "../assets/css/Login.css";
import image from "../assets/images/medisense.png";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { useLoginUserMutation } from "../store/api/authApi";

function Login() {
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const { register, handleSubmit, getValues } = useForm();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await loginUser(getValues());
      console.log("res", response);
      if (response.data && !response.data.error) {
        const token = response.data.payload;
        localStorage.setItem("token", token);
        navigate("home/dashboard");
        const Toast = Swal.mixin({
          toast: true,
          position: "top-end",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
          },
        });
        Toast.fire({
          icon: "success",
          title: "Welcome to the MediSense!",
        });
      } else {
        console.log("Login Error", response);
        Swal.fire({
          title: "Oops...",
          text: response?.error?.data?.payload || response?.data?.payload,
          icon: "error",
        });
      }
    } catch (error) {
      console.log("Login Error", error);
    }
  };

  useEffect(() => {
    document.title = "LogIn | Medisense";
  }, []);

  return (
    <div className="login-main">
      <form className="login-form" onSubmit={handleSubmit(handleLogin)}>
        {/* <h1 className="login-head">Login</h1> */}
        <img src={image} alt="Your Image" className="login-image" />
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
        <Button type="submit" className="login-btn">
          Login
        </Button>
        <div className="login-form-bot">
          {/* <Checkbox>Remember Me</Checkbox> */}
          <p className="login-form-bot-forgot">Forgot Password</p>
        </div>
      </form>
    </div>
  );
}

export default Login;
