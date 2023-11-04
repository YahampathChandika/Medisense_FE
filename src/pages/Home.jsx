import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";

function home() {
  return (
    <div>
      <div style={{ display: "flex", width: "100%" }} className="hello">
        <Sidebar />
        <Outlet /> 
      </div>
    </div>
  );
}

export default home;
