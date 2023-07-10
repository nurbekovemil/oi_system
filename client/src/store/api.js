import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { logout } from "./slices/auth-slice";
const SERVER_HOST = process.env.REACT_APP_SERVER_HOST;

const baseQuery = fetchBaseQuery({
  baseUrl: SERVER_HOST,
  credentials: "include",
  tagTypes: ["Company", "UpdateCompany", "UserUpdate"],
  prepareHeaders: (headers, { getState }) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    const refreshResult = await baseQuery("/auth/refresh", api, extraOptions);
    if (refreshResult?.data) {
      localStorage.setItem(
        "accessToken",
        refreshResult.data.tokens.accessToken
      );
      result = await baseQuery(args, api, extraOptions);
    } else {
      api.dispatch({ type: "auth/logout" });
      await baseQuery("/auth/logout", api, extraOptions);
    }
  }
  return result;
};

export const api = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({}),
  tagTypes: ["Company"],
});
