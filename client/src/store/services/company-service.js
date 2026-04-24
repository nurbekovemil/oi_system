import { api } from "../api";

const companyApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getCompanyTemplate: builder.query({
      query: (formType) => `companies/temp/${formType}`,
    }),
    createCompany: builder.mutation({
      query: (data) => ({
        url: "companies",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Company"],
    }),
    updateCompany: builder.mutation({
      query: (data) => ({
        url: "companies",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["UpdateCompany"],
    }),
    getCompanies: builder.query({
      query: ({ page, limit, search }) => {
        const params = new URLSearchParams({ page, limit });
        if (search) params.set("search", search);
        return `companies?${params.toString()}`;
      },
      providesTags: ["Company"],
    }),
    getCompaniesForOption: builder.query({
      query: () => "companies/option",
      providesTags: ["Company"],
    }),
    getCompanyById: builder.query({
      query: (id) => `companies/${id}`,
      providesTags: ["UpdateCompany"],
    }),
    getCompanyOiKseLinks: builder.query({
      query: (id) => `companies/${id}/oi-kse`,
      providesTags: ["UpdateCompany"],
    }),
    createCompanyOiKseLink: builder.mutation({
      query: ({ companyId, ...data }) => ({
        url: `companies/${companyId}/oi-kse`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UpdateCompany", "Company"],
    }),
    updateCompanyOiKseLink: builder.mutation({
      query: ({ companyId, linkId, ...data }) => ({
        url: `companies/${companyId}/oi-kse/${linkId}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["UpdateCompany", "Company"],
    }),
    removeCompanyOiKseLink: builder.mutation({
      query: ({ companyId, linkId }) => ({
        url: `companies/${companyId}/oi-kse/${linkId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["UpdateCompany", "Company"],
    }),
    removeCompany: builder.mutation({
      query: (data) => ({
        url: "/companies/delete",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Company"],
    }),
  }),
});

export default companyApi;
export const {
  useGetCompanyTemplateQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useGetCompaniesQuery,
  useGetCompaniesForOptionQuery,
  useGetCompanyByIdQuery,
  useGetCompanyOiKseLinksQuery,
  useCreateCompanyOiKseLinkMutation,
  useUpdateCompanyOiKseLinkMutation,
  useRemoveCompanyOiKseLinkMutation,
  useLazyGetCompanyByIdQuery,
  useRemoveCompanyMutation,
} = companyApi;
