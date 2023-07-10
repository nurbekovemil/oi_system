import { Navigate, Outlet, useOutlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Main from "../layout/Main";

const Private = () => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  return (
    <>
      {isAuth ? (
        <Main>
          <Outlet />
        </Main>
      ) : (
        <Navigate to="/auth" />
      )}
    </>
  );
};

export default Private;
