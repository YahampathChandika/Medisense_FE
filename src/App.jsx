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
import All from "./components/tables/createPackage/All";
import Available from "./components/tables/createPackage/Available";
import Selected from "./components/tables/createPackage/Selected";
import Xray from "./pages/Xray";
import MiniLab from "./pages/MiniLab";
import Lab from "./pages/Lab";
import Customers from "./pages/Customers";
import TablePatients from "./components/tables/customers/TablePatients";
import Test from "./pages/Test";
import SelectedPackages from "./components/tables/tests/SelectedPackages";
import Users from "./pages/Users";
import UserRegistration from "./components/modals/UserRegistration";
import Agency from "./pages/Agency";
import AddAgency from "./components/modals/AddAgency";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="tablePatients" element={<TablePatients />} />
      <Route path="userRegistration" element={<UserRegistration />} />
      <Route path="/home" element={<Home />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="opdTest" element={<OpdTest />} />
        <Route path="reception" element={<Reception />} />
        <Route path="customers" element={<Customers />} />
        <Route path="cashier" element={<Cashier />} />
        <Route path="gcc" element={<Gcc />} />
        <Route path="opd" element={<OpdTest />} />
        <Route path="addAgency" element={<AddAgency />} />
        <Route path="agency" element={<Agency />} />
        <Route path="xray" element={<Xray />} />
        <Route path="users" element={<Users />} />
        <Route path="miniLab" element={<MiniLab />} />
        <Route path="lab" element={<Lab />} />
        <Route path="test" element={<Test />}>
          <Route index element={<SelectedPackages />} />
          <Route path="selectedPackages" element={<SelectedPackages />} />
        </Route>
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
