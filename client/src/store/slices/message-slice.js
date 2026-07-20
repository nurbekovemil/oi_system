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

const stripHtml = (value) =>
  String(value)
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const extractErrorMessage = (payload, fallback = "Произошла ошибка") => {
  const data = payload?.data;
  const status = payload?.status;

  if (data == null) {
    if (status === 503) return "Сервис временно недоступен (503)";
    if (status === 502) return "Ошибка шлюза (502)";
    if (status === 504) return "Превышено время ожидания (504)";
    return fallback;
  }

  if (typeof data === "string") {
    const text = data.trim();
    if (text.startsWith("<") || /<\/?[a-z][\s\S]*>/i.test(text)) {
      const plain = stripHtml(text);
      if (/503/i.test(plain)) return "Сервис временно недоступен (503)";
      if (/502/i.test(plain)) return "Ошибка шлюза (502)";
      if (/504/i.test(plain)) return "Превышено время ожидания (504)";
      return plain || fallback;
    }
    return text || fallback;
  }

  if (typeof data.message?.errorMessage === "string") {
    return data.message.errorMessage;
  }
  if (typeof data.errorMessage === "string") return data.errorMessage;
  if (typeof data.message === "string") {
    const text = data.message.trim();
    if (text.startsWith("<")) return stripHtml(text) || fallback;
    return text;
  }
  if (Array.isArray(data.message)) return data.message.join(", ");
  return fallback;
};

const showMessage = (message, type) => {
  const text =
    typeof message === "string" && message.trim()
      ? message
      : "Произошла ошибка";
  notification[type]({
    message: text,
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
    builder.addMatcher(
      reportApi.endpoints.sendReport.matchRejected,
      (state, { payload }) =>
        showMessage(extractErrorMessage(payload), "error")
    );
    // Auth messages
    builder.addMatcher(
      authApi.endpoints.login.matchRejected,
      (state, { payload }) => {
        showMessage(extractErrorMessage(payload, "Ошибка авторизации"), "error");
      }
    );
    builder.addMatcher(
      authApi.endpoints.rutoken.matchRejected,
      (state, { payload }) => {
        showMessage(extractErrorMessage(payload, "Ошибка входа через Рутокен"), "error");
      }
    );
    builder.addMatcher(
      authApi.endpoints.cloudEdsSendPinCode.matchFulfilled,
      () => {
        showMessage("Пин код отправлен на почту", "success");
      }
    );
    builder.addMatcher(
      authApi.endpoints.cloudEdsSendPinCode.matchRejected,
      (state, { payload }) => {
        showMessage(extractErrorMessage(payload, "Ошибка отправки пин-кода"), "error");
      }
    );
    // User messages
    builder.addMatcher(
      userApi.endpoints.createUser.matchFulfilled,
      () => {
        showMessage("Пользователь успешно создан", "success");
      }
    );
    builder.addMatcher(
      userApi.endpoints.updateUser.matchFulfilled,
      () => {
        showMessage("Данные пользователя успешно обновлены", "success");
      }
    );
    builder.addMatcher(
      userApi.endpoints.createUser.matchRejected,
      (state, { payload }) => {
        showMessage(
          extractErrorMessage(payload, "Ошибка создания пользователя"),
          "error"
        );
      }
    );
    builder.addMatcher(
      userApi.endpoints.updateUserPassword.matchFulfilled,
      () => {
        showMessage("Пароль успешно изменен", "success");
      }
    );
    builder.addMatcher(
      userApi.endpoints.updateUserPassword.matchRejected,
      () => {
        showMessage("Неверный пароль", "error");
      }
    );
    builder.addMatcher(
      userApi.endpoints.resetUserPass.matchFulfilled,
      () => {
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
        showMessage(
          extractErrorMessage(payload, "Ошибка отправки пин-кода"),
          "error"
        );
      }
    );
    builder.addMatcher(
      edsApi.endpoints.confirmPinCode.matchRejected,
      (state, { payload }) => {
        showMessage(
          extractErrorMessage(payload, "Ошибка подписания ЭЦП"),
          "error"
        );
      }
    );
    builder.addMatcher(
      edsApi.endpoints.signRutoken.matchRejected,
      (state, { payload }) => {
        showMessage(
          extractErrorMessage(payload, "Ошибка подписания Рутокен"),
          "error"
        );
      }
    );
  },
});
export const { logout } = messageSlice.actions;

export default messageSlice.reducer;
