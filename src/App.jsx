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
import All from "./components/createPackage/All";
import Available from "./components/createPackage/Available";
import Selected from "./components/createPackage/Selected";
import AddAgency from "./pages/AddAgency";
import Xray from "./pages/Xray";
import MiniLab from "./pages/MiniLab";
import Lab from "./pages/Lab";
import Patients from "./pages/Patients";
import TablePatients from "./components/tables/TablePatients";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="tablePatients" element={<TablePatients />} />
      <Route path="/home" element={<Home />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="opdTest" element={<OpdTest />} />
        <Route path="reception" element={<Reception />} />
        <Route path="patients" element={<Patients />} />
        <Route path="cashier" element={<Cashier />} />
        <Route path="cashier" element={<Cashier />} />
        <Route path="gcc" element={<Gcc />} />
        <Route path="opd" element={<OpdTest />} />
        <Route path="addAgency" element={<AddAgency />} />
        <Route path="xray" element={<Xray />} />
        <Route path="miniLab" element={<MiniLab />} />
        <Route path="lab" element={<Lab />} />
        <Route path="createPackage" element={<CreatePackage />}>
          <Route index element={<All />} />
          <Route path="allTests" element={<All />} />
          <Route path="availableTests" element={<Available />} />
          <Route path="selectedTests" element={<Selected />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
