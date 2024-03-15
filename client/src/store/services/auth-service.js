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
      providesTags: ["getMe"],
    }),
    logout: builder.query({
      query: () => ({
        url: "auth/logout",
        method: "GET",
      }),
    }),
    rutoken: builder.mutation({
      query: (data) => ({
        url: "auth/rutoken",
        method: "POST",
        body: data
      }),
    }),
    cloudEdsSendPinCode: builder.mutation({
      query: (data) => ({
        url: "auth/cloud-eds-pin",
        method: "POST",
        body: data
      }),
    }),
    cloudEdsConfirmPinCode: builder.mutation({
      query: (data) => ({
        url: "auth/cloud-eds-confirm",
        method: "POST",
        body: data
      }),
    }),
  }),
});

export default authApi;
export const { useLoginMutation, useLazyCheckAuthQuery, useLazyLogoutQuery, useRutokenMutation, useCloudEdsSendPinCodeMutation, useCloudEdsConfirmPinCodeMutation } =
  authApi;
