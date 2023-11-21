import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./Auth";

export default function PrivateRoute() {
  const { currentUser } = useAuth();

  return currentUser ? <Outlet /> : <Navigate to={"/login"} />;
}

