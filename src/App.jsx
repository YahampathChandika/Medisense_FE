import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Reception from "./pages/Reception";
import Cashier from "./pages/Cashier";
import Gcc from "./pages/Gcc";
import OpdTest from "./pages/OpdTest";
import CreatePackage from "./pages/CreatePackage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="reception" element={<Reception />} />
        <Route path="cashier" element={<Cashier />} />
        <Route path="gcc" element={<Gcc />} />
        <Route path="opdTest" element={<OpdTest />} />
        <Route path="createPackage" element={<CreatePackage />} />
      </Route>
    </Routes>
  );
}

export default App;
