import { api } from "../api";

const contractApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getContracts: builder.query({
      query: () => 'contracts',
      providesTags: ["Contracts"],
    }),
    getContractTypes: builder.query({
      query: (value) => 'contracts/types',
    }),
    getContractTypeById: builder.query({
      query: (value) => `contracts/types/${value}`,
    }),
    getContractById: builder.query({
      query: (value) => `contracts/${value}`,
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
export const { 
  useGetContractsQuery, 
  useGetContractTypesQuery, 
  useGetContractTypeByIdQuery, 
  useCreateContractMutation,
  useLazyGetContractByIdQuery} = contractApi;
