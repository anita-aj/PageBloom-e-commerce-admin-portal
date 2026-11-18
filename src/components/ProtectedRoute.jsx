import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/useAuthStore"; 

function ProtectedRoute() { // the security
  const user = useAuthStore((s) => s.user); // read just the user from the useAuthStore
  return user ? <Outlet /> : <Navigate to="/login" replace />; // logged in? show the page. If not, send to /login
}
export default ProtectedRoute;