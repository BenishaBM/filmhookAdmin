import React  from "react";
import { useSelector } from "react-redux";
import { selectJwt } from "../redux/slices/loginSlice";
import { Navigate } from "react-router-dom";

const ProtectedPage = ({ children }) => {
  const jwt = useSelector(selectJwt);

  return jwt ? children : <Navigate to="/login" replace />;
};

export default ProtectedPage;
