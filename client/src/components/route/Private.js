import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Main from "../layout/Main";

const Private = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <>
      {isAuthenticated ? (
        <Main>
          <Outlet />
        </Main>
      ) : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Private;
