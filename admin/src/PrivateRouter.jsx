import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux"; // Import the useSelector hook to get userInfo from Redux store

const PrivateRoute = () => {
  const userInfo = useSelector((state) => state.userLogin.userInfo);

  // If userInfo exists, allow access and render child elements
  // If userInfo does not exist, navigate to login page
  return userInfo ? <Outlet /> : <Navigate to="/signin" />;
};

export default PrivateRoute;
