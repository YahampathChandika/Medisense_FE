import React from "react";
import {  Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home"

function App() {
  return (
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/home" element={<Home />}>
        <Route path="hello" element={<Dashboard />} />
        </Route>
      </Routes>
  );
}

export default App;
