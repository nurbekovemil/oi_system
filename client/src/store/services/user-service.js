import { api } from "../api";

const userApi = api.injectEndpoints({
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "users",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["UserCreate"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "users",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["UserUpdate"],
    }),
    getUsers: builder.query({
      query: (data) => ({
        url: "users",
        method: "GET",
      }),
      providesTags: ["UserUpdate"],
    }),
    getUserById: builder.query({
      query: (id) => `users/${id}`,
    }),
    getUserTemplate: builder.query({
      query: (form_type) => `users/temp/${form_type}`,
    }),
  }),
});

export default userApi;
export const {
  useGetUserTemplateQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useGetUsersQuery,
  useLazyGetUserByIdQuery,
  useGetUserByIdQuery,
} = userApi;
