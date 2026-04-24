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
      invalidatesTags: (result, error, arg) => [
        { type: "ReportById", id: arg.reportId },
      ],
    }),
    updateReportCompanyId: builder.mutation({
      query: (data) => ({
        url: "reports/company",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: (result, error, arg) => [
        { type: "ReportById", id: arg.reportId },
      ],
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
    rejectReport: builder.mutation({
      query: (data) => ({
        url: "reports/reject",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Reports"],
    }),
    removeReport: builder.mutation({
      query: (data) => ({
        url: "reports/remove",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Reports"],
    }),
    getReports: builder.query({
      query: ({ page, limit, companyId, typeId, statusId, dateFrom, dateTo }) => {
        const params = new URLSearchParams();
        if (companyId) params.set("companyId", companyId);
        if (typeId) params.set("typeId", typeId);
        if (statusId) params.set("statusId", statusId);
        if (dateFrom) params.set("dateFrom", dateFrom);
        if (dateTo) params.set("dateTo", dateTo);
        const query = params.toString();
        return `reports/sort/${page}/${limit}${query ? `?${query}` : ""}`;
      },
      providesTags: ["Reports"],
    }),
    getReportStatuses: builder.query({
      async queryFn(_arg, _api, _extraOptions, baseQuery) {
        const primary = await baseQuery("reports/statuses");
        if (!primary.error) {
          return { data: primary.data };
        }
        if (primary.error?.status === 404) {
          const fallback = await baseQuery("reports/status");
          if (!fallback.error) {
            return { data: fallback.data };
          }
          return { error: fallback.error };
        }
        return { error: primary.error };
      },
    }),
    getReportByGroupType: builder.query({
      query: ({ reportId, type }) =>
        `reports/group?type=${type}&reportId=${reportId}`,
      providesTags: [],
    }),
    getReportById: builder.query({
      query: (id) => `reports/by/${id}`,
      providesTags: (result, error, arg) => [{ type: "ReportById", id: arg }],
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
  useGetReportStatusesQuery,

  useLazyGetReportTemplateQuery,
  useLazyGetReportByIdQuery,
  useLazyGetReportsQuery,
  useLazyGetReportByGroupTypeQuery,

  useUploadReportFileMutation,
  useRemoveReportFileMutation,
  useCreateReportMutation,
  useUpdateReportMutation,
  useSendReportMutation,
  useRemoveReportMutation,
  useRejectReportMutation,
  useUpdateReportCompanyIdMutation
} = companyApi;
