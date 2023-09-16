import { api } from "../api";

const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reports"],
    }),
    checkAuth: builder.query({
      query: () => ({
        url: "auth/refresh",
        method: "GET",
      }),
    }),
    logout: builder.query({
      query: () => ({
        url: "auth/logout",
        method: "GET",
      }),
    }),
  }),
});

export default authApi;
export const { useLoginMutation, useLazyCheckAuthQuery, useLazyLogoutQuery } =
  authApi;
