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
import Lab from "./pages/Lab";
import Customers from "./pages/Customers";
import TablePatients from "./components/tables/customers/TablePatients";
import Test from "./pages/Test";
import SelectedPackages from "./components/tables/testsAndPackages/SelectedPackages";
import Packages from "./components/tables/testsAndPackages/Packages";
import Tests from "./components/tables/testsAndPackages/Tests";
import Users from "./pages/Users";
import UserRegistration from "./components/modals/UserRegistration";
import Agency from "./pages/Agency";
import AddAgency from "./components/modals/AddAgency";
import TestAndPackages from "./pages/TestsAndPackages";
import CashierList from "./pages/CashierList";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./components/common/NotFound";
import MiniLabList from "./pages/MiniLabList";
import LabList from "./pages/LabList";
import XrayList from "./pages/XrayList";
import MinilabById from "./pages/MinilabById";
import CustomerDetails from "./pages/CustomerDetails";

// function App() {
//   return (
//     <Routes>
//       <Route path="/" element={<Login />} />
//       <Route path="tablePatients" element={<TablePatients />} />
//       <Route path="userRegistration" element={<UserRegistration />} />
//       <Route path="/home" element={<Home />}>
//         <Route index path="dashboard" element={<Dashboard />} />
//         <Route path="opdTest" element={<OpdTest />} />
//         <Route path="reception" element={<Reception />} />
//         <Route path="customers" element={<Customers />} />
//         <Route path="testAndPackages" element={<TestAndPackages />}>
//           <Route index element={<Packages />} />
//           <Route path="packages" element={<Packages />} />
//           <Route path="tests" element={<Tests />} />
//         </Route>
//         <Route path="cashier/:customerId/:admissionId" element={<Cashier />} />
//         <Route path="cashier" element={<Cashier />} />
//         <Route path="cashierList" element={<CashierList />} />
//         <Route path="gcc" element={<Gcc />} />
//         <Route path="opd" element={<OpdTest />} />
//         <Route path="addAgency" element={<AddAgency />} />
//         <Route path="agency" element={<Agency />} />
//         <Route path="xray" element={<Xray />} />
//         <Route path="users" element={<Users />} />
//         <Route path="miniLab" element={<MiniLab />} />
//         <Route path="lab" element={<Lab />} />
//         <Route path="test/:customerId/:admissionId" element={<Test />}>
//           <Route index element={<SelectedPackages />} />
//           <Route path="selectedPackages" element={<SelectedPackages />} />
//         </Route>
//         <Route path="createPackage" element={<CreatePackage />}>
//           <Route index element={<All />} />
//           <Route path="allTests" element={<All />} />
//           <Route path="availableTests" element={<Available />} />
//           <Route path="selectedTests" element={<Selected />} />
//         </Route>
//       </Route>
//     </Routes>
//   );
// }

const ROLES = {
  Admin: 1,
  Reception: 2,
  Cashier: 3,
  Accounts: 4,
  Lab: 5,
  MiniLAb: 6,
  Doctor: 7,
  XRay: 8,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="*" element={<NotFound />} />
      <Route path="tablePatients" element={<TablePatients />} />
      <Route
        path="userRegistration"
        element={
          <ProtectedRoute
            element={<UserRegistration />}
            requiredRoles={[ROLES.Admin]}
          />
        }
      />
      <Route path="/home" element={<Home />}>
        <Route index path="dashboard" element={<Dashboard />} />
        <Route
          path="reception"
          element={
            <ProtectedRoute
              element={<Reception />}
              requiredRoles={[ROLES.Admin, ROLES.Reception]}
            />
          }
        />
        <Route
          path="gcc"
          element={
            <ProtectedRoute
              element={<Gcc />}
              requiredRoles={[ROLES.Admin, ROLES.Reception]}
            />
          }
        />
        <Route
          path="gcc/:customerId"
          element={
            <ProtectedRoute
              element={<Gcc />}
              requiredRoles={[ROLES.Admin, ROLES.Reception]}
            />
          }
        />
        <Route
          path="opd"
          element={
            <ProtectedRoute
              element={<OpdTest />}
              requiredRoles={[ROLES.Admin, ROLES.Reception]}
            />
          }
        />
        <Route path="customers" element={<Customers />} />
        <Route
          path="testAndPackages"
          element={
            <ProtectedRoute
              element={<TestAndPackages />}
              requiredRoles={[ROLES.Admin, ROLES.Reception]}
            />
          }
        >
          <Route index element={<Packages />} />
          <Route path="packages" element={<Packages />} />
          <Route path="tests" element={<Tests />} />
        </Route>
        <Route
          path="cashier/:customerId/:admissionId"
          element={
            <ProtectedRoute
              element={<Cashier />}
              requiredRoles={[ROLES.Admin, ROLES.Cashier]}
            />
          }
        />
        <Route
          path="cashier"
          element={
            <ProtectedRoute
              element={<Cashier />}
              requiredRoles={[ROLES.Admin, ROLES.Cashier]}
            />
          }
        />
        <Route
          path="cashierList"
          element={
            <ProtectedRoute
              element={<CashierList />}
              requiredRoles={[ROLES.Admin, ROLES.Cashier]}
            />
          }
        />
        <Route
          path="customerDetails/:customerId/:admissionId"
          element={
            <ProtectedRoute
              element={<CustomerDetails />}
              requiredRoles={[ROLES.Admin, ROLES.Cashier]}
            />
          }
        />
        <Route path="addAgency" element={<AddAgency />} />
        <Route path="agency" element={<Agency />} />
        <Route
          path="xrayList"
          element={
            <ProtectedRoute
              element={<XrayList />}
              requiredRoles={[ROLES.Admin, ROLES.XRay]}
            />
          }
        />
        <Route
          path="xray/:customerId/:admissionId"
          element={
            <ProtectedRoute
              element={<Xray />}
              requiredRoles={[ROLES.Admin, ROLES.Cashier]}
            />
          }
        />
        <Route
          path="users"
          element={
            <ProtectedRoute element={<Users />} requiredRoles={[ROLES.Admin]} />
          }
        />
        <Route
          path="miniLabList"
          element={
            <ProtectedRoute
              element={<MiniLabList />}
              requiredRoles={[ROLES.Admin, ROLES.MiniLAb]}
            />
          }
        />
        <Route
          path="MinilabById/:customerId/:admissionId"
          element={
            <ProtectedRoute
              element={<MinilabById />}
              requiredRoles={[ROLES.Admin, ROLES.MiniLAb]}
            />
          }
        />
        <Route
          path="labList"
          element={
            <ProtectedRoute
              element={<LabList />}
              requiredRoles={[ROLES.Admin, ROLES.Lab]}
            />
          }
        />
        <Route
          path="lab/:customerId/:admissionId"
          element={
            <ProtectedRoute
              element={<Lab />}
              requiredRoles={[ROLES.Admin, ROLES.Cashier]}
            />
          }
        />
        <Route
          path="test/:customerId/:admissionId"
          element={
            <ProtectedRoute
              element={<Test />}
              requiredRoles={[ROLES.Admin, ROLES.Reception]}
            />
          }
        >
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
