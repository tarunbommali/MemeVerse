import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoute = () => {
  const isLoggedIn = false;
  return <div>{isLoggedIn ? <Outlet /> : <Navigate to="/login" />}</div>;
};

export default ProtectedRoute;
