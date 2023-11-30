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
    updateUserPassword: builder.mutation({
      query: (data) => ({
        url: "users/change-pass",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["getMe"],
    }),
    getUsers: builder.query({
      query: ({ page, limit }) => `users?page=${page}&limit=${limit}`,
      providesTags: ["UserUpdate"],
    }),
    resetUserPass: builder.query({
      query: ({ userId }) => `users/reset/pass?userId=${userId}`,
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
  useUpdateUserPasswordMutation,
  useGetUsersQuery,
  useLazyGetUserByIdQuery,
  useLazyResetUserPassQuery,
  useGetUserByIdQuery,
} = userApi;
