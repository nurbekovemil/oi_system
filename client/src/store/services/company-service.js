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
      query: ({ page, limit }) => `companies?page=${page}&limit=${limit}`,
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
  useLazyGetCompanyByIdQuery,
  useRemoveCompanyMutation,
} = companyApi;
