import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth.js";
export function ProtectedRoute() {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
