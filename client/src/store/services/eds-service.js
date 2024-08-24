import { api } from "../api";

const edsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    sendPinCode: builder.mutation({
      query: () => ({
        url: "eds/pin/send",
        method: "POST",
      }),
      invalidatesTags: [""],
    }),
    confirmPinCode: builder.mutation({
      query: (data) => ({
        url: "eds/pin/confirm",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reports", "ReportById"],
    }),
    signRutoken: builder.mutation({
      query: (data) => ({
        url: "eds/rutoken/sign",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reports", "ReportById"],
    }),
    signContractRutoken: builder.mutation({
      query: (data) => ({
        url: "eds/contract/rutoken/sign",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Contracts"],
    }),
  }),
});

export default edsApi;
export const {
  useSendPinCodeMutation,
  useConfirmPinCodeMutation,
  useSignRutokenMutation,
  useSignContractRutokenMutation
} = edsApi;
