import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

import Main from "../layout/Main";
import { useEffect } from "react";
import { notification } from "antd";

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
