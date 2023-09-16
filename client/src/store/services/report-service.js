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
    uploadReportFile: builder.mutation({
      query: (data) => ({
        url: "reports/file",
        method: "POST",
        body: data,
      }),
    }),
    removeReportFile: builder.mutation({
      query: (data) => ({
        url: "reports/file/remove",
        method: "POST",
        body: data,
      }),
    }),
    sendReport: builder.mutation({
      query: (data) => ({
        url: "reports/send",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reports"],
    }),
    getReports: builder.query({
      query: ({ page, limit }) => `reports/sort/${page}/${limit}`,
      providesTags: ["Reports"],
    }),
    getReportById: builder.query({
      query: (id) => `reports/by/${id}`,
      providesTags: ["ReportById"],
    }),
    getOldReports: builder.query({
      query: () => "reports/old",
      providesTags: [],
    }),
    getReportTypes: builder.query({
      query: () => "reports/types",
    }),
    getReportTypeById: builder.query({
      query: (id) => `reports/types/${id}`,
    }),
    getReportTemplate: builder.query({
      query: (tid) => `reports/template/${tid}`,
    }),
  }),
});

export default companyApi;
export const {
  useGetReportTypesQuery,
  useGetReportTypeByIdQuery,
  useGetReportTemplateQuery,
  useGetReportByIdQuery,
  useGetOldReportsQuery,
  useGetReportsQuery,

  useLazyGetReportTemplateQuery,
  useLazyGetReportByIdQuery,
  useLazyGetReportsQuery,

  useUploadReportFileMutation,
  useRemoveReportFileMutation,
  useCreateReportMutation,
  useUpdateReportMutation,
  useSendReportMutation,
} = companyApi;
