import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const Public = () => {
  const location = useLocation();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      {location.pathname == "/auth" && isAuth ? (
        <Navigate to="/dashboard/profile" />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Public;
