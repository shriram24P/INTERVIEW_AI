import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router";

const Protected = ({ children }) => {
  const isLoading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);

  if (isLoading) {
    return <span className="loading loading-spinner loading-md"></span>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default Protected;
