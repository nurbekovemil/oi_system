import { api } from "../api";

const contractApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getContracts: builder.query({
      query: (value) => 'contracts',
    }),
    getContractTypes: builder.query({
      query: (value) => 'contracts/types',
    }),
    getContractTypeById: builder.query({
      query: (value) => `contracts/types/${value}`,
    }),
    createContract: builder.mutation({
      query: (data) => ({
        url: "contracts",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [],
    }),
  }),
});

export default contractApi;
export const { useGetContractTypesQuery, useGetContractTypeByIdQuery } = contractApi;
