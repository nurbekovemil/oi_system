import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Main from "../layout/Main";
import { useLazyCheckAuthQuery } from "../../store/services/auth-service";

const Private = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  const hasToken = Boolean(localStorage.getItem("accessToken"));
  const [checkAuth, { isFetching, isUninitialized }] = useLazyCheckAuthQuery();

  useEffect(() => {
    if (!isAuthenticated && hasToken) {
      checkAuth();
    }
  }, [isAuthenticated, hasToken, checkAuth]);

  return (
    <>
      {isAuthenticated ? (
        <Main>
          <Outlet />
        </Main>
      ) : hasToken && (isFetching || isUninitialized) ? null : (
        <Navigate to="/" />
      )}
    </>
  );
};

export default Private;
