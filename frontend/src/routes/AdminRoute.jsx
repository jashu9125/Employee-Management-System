import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {

  const user = JSON.parse(
    localStorage.getItem("currentUser")
  );

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (
    user.role?.toLowerCase() !== "admin"
  ) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default AdminRoute;