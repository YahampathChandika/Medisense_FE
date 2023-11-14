import React, { useState } from "react";
import "../../assets/css/Navbar.css";
import { Link , Navigate, useNavigate } from "react-router-dom";
// import image from "../../assets/images/dummy-profile-_new.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPowerOff, faRefresh } from "@fortawesome/free-solid-svg-icons";
// import Profilepopup from "../user/Profilepopup";

function Navbar() {

  return (
    <div>
      <nav className="navbar">
        <Link to="/home" className="nav-title">
          Medisense
        </Link>
        <div className="nav-flex"></div>
        <div className="nav-user">
          
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
