import React, { useCallback, useEffect } from "react";
import ChangeUserPass from "../../components/profile/ChangeUserPass";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const btnStyle = {
  background: "#57b6c0",
  borderColor: "#57b6c0",
};
const ChangeDefaultPass = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (!user?.changePass) {
      navigate("/dashboard/reports");
    }
  }, [user]);
  return (
    <>
      {user?.changePass && (
        <ChangeUserPass
          btnStyle={btnStyle}
          title="Придумайте новый пароль"
          col="12"
          user={user}
          description="Введите более сложный пароль, стандартный пароль ненаденжный"
        />
      )}
    </>
  );
};
export default ChangeDefaultPass;
