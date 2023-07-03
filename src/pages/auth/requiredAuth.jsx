import { Navigate, Outlet } from "react-router-dom";
import jwtDecode from "jwt-decode";

const RequiredAuth = () => {
  const token = localStorage.getItem("token");
  let role = "";

  if (token) {
    try {
      const decodedToken = jwtDecode(token);
      role = decodedToken.role;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  } else {
    console.error("No token found in localStorage");
  }

  return token ? <Outlet /> : <Navigate to="/auth/sign-in" />;
};

export default RequiredAuth;
