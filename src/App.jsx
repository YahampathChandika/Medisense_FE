import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />}>
        {/* <Route path="/login" element={<Login />} /> */}
      </Route>
    </Routes>
  );
}

export default App;
