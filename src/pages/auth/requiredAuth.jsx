import { useLocation, Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";

const RequiredAuth = () => {
  const token = localStorage.getItem("token");
  let role = "";

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      role = decodedToken.role;
      // Use the extracted username and role variables as needed
    } catch (error) {
      console.error("Error decoding token:", error);
      // Handle the error (e.g., show an error message, redirect the user, etc.)
    }
  } else {
    console.error("No token found in localStorage");
    // Handle the case where there is no token (e.g., show an error message, redirect the user, etc.)
  }

  return token ? <Outlet /> : <Navigate to="/auth/sign-in" />;
};

export default RequiredAuth;
