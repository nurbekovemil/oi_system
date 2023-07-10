import { api } from "../api";

const companyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getReportTypes: builder.query({
      query: () => "reports/types",
    }),
  }),
});

export default companyApi;
export const { useGetReportTypesQuery } = companyApi;
