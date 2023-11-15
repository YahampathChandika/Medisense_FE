import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Reception from "./pages/Reception";
import Cashier from "./pages/Cashier";
import OpdTest from "./pages/OpdTest";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="reception" element={<Reception />} />
        <Route path="cashier" element={<Cashier />} />
        <Route path="opdTest" element={<OpdTest />} />
      </Route>
    </Routes>
  );
}

export default App;
