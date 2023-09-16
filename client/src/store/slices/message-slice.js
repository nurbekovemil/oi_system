import { createSlice } from "@reduxjs/toolkit";
import reportApi from "../services/report-service";
import authApi from "../services/auth-service";
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
    builder.addMatcher(reportApi.endpoints.createReport.matchFulfilled, () =>
      showMessage("Документ успешно создан", "success")
    );
    builder.addMatcher(
      authApi.endpoints.login.matchRejected,
      (state, { payload }) => {
        // console.log(action);
        showMessage(payload.data.message, "error");
      }
    );
  },
});
export const { logout } = messageSlice.actions;

export default messageSlice.reducer;
