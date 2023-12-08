import React from "react";
import { Checkbox } from "rsuite";
import { Button } from "react-bootstrap";
import "rsuite/dist/rsuite-no-reset.min.css";
import "../assets/css/Login.css";
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
          title: "Signed in successfully",
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
      <div className="login-main-con">
        <div className="login-left-con">
          <form className="login-left" onSubmit={handleSubmit(handleLogin)}>
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
            <Button
              type="submit"
              className="w-60 h-10 mt-10 hover:bg-slate-800 bg-gray-700 rounded-none	 text-white"
            >
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
