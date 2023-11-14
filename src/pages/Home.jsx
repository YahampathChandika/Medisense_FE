import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";
import Navbar from "../components/common/Navbar";

function home() {
  return (
    <div style={{ width: "100vw", height:'100vh' }}>
      <Navbar />
      <div style={{ display: "flex" }}>
        <Sidebar />
        <Outlet /> 
      </div>
    </div>
  );
}

export default home;
