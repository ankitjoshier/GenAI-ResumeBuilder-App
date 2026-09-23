import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

function Protected() {
  //   const navigate = useNavigate();
  const { loading, user } = useAuth();
  if (loading) {
    return <main>Loading.....</main>;
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return children;
}

export default Protected;
