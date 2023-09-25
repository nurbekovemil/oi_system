import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
const Public = () => {
  const location = useLocation();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      {location.pathname == "/" && isAuth ? (
        <Navigate to="/dashboard/reports" />
      ) : (
        <Outlet />
      )}
    </>
  );
};

export default Public;
