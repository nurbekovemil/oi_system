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
  }),
});

export default edsApi;
export const {
  useSendPinCodeMutation,
  useConfirmPinCodeMutation,
  useSignRutokenMutation,
} = edsApi;
