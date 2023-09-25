import { api } from "../api";

const receiptApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getReceiptById: builder.query({
      query: (id) => `receipt/${id}`,
    }),
  }),
});

export default receiptApi;
export const { useGetReceiptByIdQuery } = receiptApi;
