import React from "react";
import { Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Reception from "./pages/Reception";
import Cashier from "./pages/Cashier";
import Gcc from "./pages/Gcc";
import OpdTest from "./pages/OpdTest";
<<<<<<< HEAD
import AddAgency from "./pages/AddAgency";
=======
import CreatePackage from "./pages/CreatePackage";
import All from "./components/createPackage/All";
import Available from "./components/createPackage/Available";
import Selected from "./components/createPackage/Selected";
>>>>>>> f1f762de7505d4bfb6770846aa0cc5c500f5645a

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
<<<<<<< HEAD
        <Route path="addAgency" element={<AddAgency />} />
=======
        <Route path="createPackage" element={<CreatePackage />}>
          <Route index element={<All />} />
          <Route path="allTests" element={<All />} />
          <Route path="availableTests" element={<Available />} />
          <Route path="selectedTests" element={<Selected />} />
        </Route>
>>>>>>> f1f762de7505d4bfb6770846aa0cc5c500f5645a
      </Route>
    </Routes>
  );
}

export default App;
