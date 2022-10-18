import React, { useEffect } from "react";

import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  const redirectTo = useNavigate();

  useEffect(() => {
    if (!user) {
      redirectTo("/user/login");
    }
  }, [redirectTo, user]);

  return <>{user ? children : null}</>;
};

export default ProtectedRoute;
