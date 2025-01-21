import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {
  const { auth } = useContext(AuthContext);

  if (role && auth.role !== role) {
    return <Navigate to="/protect" />;
  }

  return children;
}

export default ProtectedRoute;
