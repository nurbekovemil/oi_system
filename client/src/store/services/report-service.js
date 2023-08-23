import { api } from "../api";

const companyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createReport: builder.mutation({
      query: (data) => ({
        url: "reports",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reports"],
    }),
    updateReport: builder.mutation({
      query: (data) => ({
        url: "reports",
        method: "PUT",
        body: data,
      }),
    }),
    getReports: builder.query({
      query: () => "reports",
      providesTags: ["Reports"],
    }),
    getReportById: builder.query({
      query: (id) => `reports/by/${id}`,
    }),
    getOldReports: builder.query({
      query: () => "reports/old",
      providesTags: [],
    }),
    getReportTypes: builder.query({
      query: () => "reports/types",
    }),
    getReportTemplate: builder.query({
      query: (tid) => `reports/template/${tid}`,
    }),
  }),
});

export default companyApi;
export const {
  useGetReportTypesQuery,
  useGetReportTemplateQuery,
  useLazyGetReportTemplateQuery,
  useCreateReportMutation,
  useUpdateReportMutation,
  useGetReportsQuery,
  useLazyGetReportByIdQuery,
  useGetOldReportsQuery,
} = companyApi;
