// import React, { useEffect, useState } from 'react';
// import { Route, Navigate, useLocation } from 'react-router-dom';

// const ProtectedRoute = ({ children, roles }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const location = useLocation();

//   useEffect(() => {
//     const checkAuthentication = async () => {
//       const roleId = parseInt(localStorage.getItem('roleId'), 10);
//       const isUserAuthenticated = roles.includes(roleId);
//       setIsAuthenticated(isUserAuthenticated);
//       setIsLoading(false);
//     };

//     checkAuthentication();
//   }, [roles]);

//   if (isLoading) {
//     // You can render a loading spinner or some other indication of loading
//     return null;
//   }

//   return isAuthenticated ? (
//     <Route>{children}</Route>
//   ) : (
//     <Navigate to="/" state={{ from: location }} replace />
//   );
// };

// export default ProtectedRoute;

import React from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import unauthorizedImage from "../assets/images/unauth.svg";

const ProtectedRoute = ({ element, requiredRoles }) => {
  const accessToken = localStorage.getItem("accessToken");
  const roleId = parseInt(localStorage.getItem("roleId"), 10);

  const location = useLocation();
  const navigate = useNavigate();

  if (!accessToken || !roleId) {
    // Redirect to login if user is not authenticated
    return <Navigate to="/" replace />;
  }

  if (!requiredRoles.includes(roleId)) {
    // Display an image for unauthorized access
    return (
      <div className="flex flex-col justify-center items-center w-full">
        <img width={"30%"} src={unauthorizedImage} alt="Unauthorized Access" />
        <p className="mt-10 font-bold text-lg">Unauthorized Access!</p>
        <button className="btn btn-primary mt-10 w-36" onClick={() => navigate(-1)}>
          Go Back
        </button>
      </div>
    );
  }

  return element;
};

export default ProtectedRoute;
