import React from "react";
import unauthorizedImage from "../../assets/images/notfound.svg";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen">
      <img width={"30%"} src={unauthorizedImage} alt="Unauthorized Access" />
      <p className="mt-10 font-bold text-lg">Page Not Found!</p>
      <button
        className="btn btn-primary mt-10 w-36"
        onClick={() => navigate(-1)}
      >
        Go Back
      </button>
    </div>
  );
}
