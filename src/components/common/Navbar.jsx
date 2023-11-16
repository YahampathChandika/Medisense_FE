import React, { useState } from "react";
import "../../assets/css/Navbar.css";
import { Link , Navigate, useNavigate } from "react-router-dom";
import image from "../../assets/images/dummy-profile-_new.jpg"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPowerOff, faRefresh } from "@fortawesome/free-solid-svg-icons";

function Navbar() {

  return (
    <div>
      <nav className="navbar">
        <div className="nav-title ">
        <Link to="/home" className="nav-title">
          <p className="nav-title-1"> Medi</p><p className="nav-title-2">sense</p>
        </Link>
        </div>
        <div>
          Admin
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
