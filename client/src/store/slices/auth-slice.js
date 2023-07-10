import { createSlice } from "@reduxjs/toolkit";
import authApi from "../services/auth-service";

const initialState = {
  isAuthenticated: false,
  user: null,
};

const setCredentials = (state, action) => {
  localStorage.setItem("accessToken", action.payload.tokens.accessToken);
  state.isAuthenticated = true;
  state.user = action.payload.user;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, setCredentials);
    builder.addMatcher(
      authApi.endpoints.checkAuth.matchFulfilled,
      setCredentials
    );
    builder.addMatcher(authApi.endpoints.logout.matchFulfilled, () => {
      console.log("logut extra reducer");
    });
  },
});
export const { logout } = authSlice.actions;

export default authSlice.reducer;
