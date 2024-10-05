import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withAuth = (Component) => {
  const AuthRoute = (props) => {
    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        // If there's no token, redirect to login
        navigate("/login");
      }
    }, [navigate]);

    // Optionally, render null or a loading state until the check is complete
    const token = localStorage.getItem("authToken");
    if (!token) {
      return null; // Or you can return a loading spinner
    }

    // Render the component if authenticated
    return <Component {...props} />;
  };

  return AuthRoute;
};

export default withAuth;
