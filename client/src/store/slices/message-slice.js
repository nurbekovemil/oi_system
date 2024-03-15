import { createSlice } from "@reduxjs/toolkit";
import reportApi from "../services/report-service";
import authApi from "../services/auth-service";
import userApi from "../services/user-service";
import edsApi from "../services/eds-service";
import { notification } from "antd";

notification.config({
  duration: 5,
  placement: "top",
  top: 15,
});

const initialState = {};

const showMessage = (message, type) => {
  notification[type]({
    message,
  });
};

const messageSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers: (builder) => {
    // Report messages
    builder.addMatcher(reportApi.endpoints.createReport.matchFulfilled, () =>
      showMessage("Документ успешно создан", "success")
    );
    builder.addMatcher(reportApi.endpoints.removeReport.matchFulfilled, () =>
      showMessage("Документ успешно удален", "success")
    );
    // Auth messages
    builder.addMatcher(
      authApi.endpoints.login.matchRejected,
      (state, { payload }) => {
        showMessage(payload.data.message, "error");
      }
    );
    builder.addMatcher(
      authApi.endpoints.cloudEdsSendPinCode.matchFulfilled,
      (state, { payload }) => {
        showMessage('Пин код отправлен на почту', "success");
      }
    );
    builder.addMatcher(
      authApi.endpoints.cloudEdsSendPinCode.matchRejected,
      (state, { payload }) => {
        console.log(payload)
        showMessage(payload.data.message, "error");
      }
    );
    // User messages
    builder.addMatcher(
      userApi.endpoints.createUser.matchFulfilled,
      (state, { payload }) => {
        showMessage("Пользователь успешно создан", "success");
      }
    );
    builder.addMatcher(
      userApi.endpoints.updateUser.matchFulfilled,
      (state, { payload }) => {
        showMessage("Данные пользователя успешно обновлены", "success");
      }
    );
    builder.addMatcher(
      userApi.endpoints.createUser.matchRejected,
      (state, { payload }) => {
        showMessage(payload?.data?.response?.message, "error");
      }
    );
    builder.addMatcher(
      userApi.endpoints.updateUserPassword.matchFulfilled,
      (state, { payload }) => {
        showMessage("Пароль успешно изменен", "success");
      }
    );
    builder.addMatcher(
      userApi.endpoints.updateUserPassword.matchRejected,
      (state, { payload }) => {
        showMessage("Неверный пароль", "error");
      }
    );
    builder.addMatcher(
      userApi.endpoints.resetUserPass.matchFulfilled,
      (state, {}) => {
        showMessage("Пароль сброшен", "success");
      }
    );
    // Eds messages
    builder.addMatcher(edsApi.endpoints.sendPinCode.matchFulfilled, () => {
      showMessage("Пин код отправлен на почту", "success");
    });
    builder.addMatcher(
      edsApi.endpoints.sendPinCode.matchRejected,
      (state, { payload }) => {
        showMessage(payload?.data?.errorMessage, "error");
      }
    );
  },
});
export const { logout } = messageSlice.actions;

export default messageSlice.reducer;
