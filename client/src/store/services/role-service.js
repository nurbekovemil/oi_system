import { api } from "../api";

const roleApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getAllRoles: builder.query({
      query: () => `roles`,
    }),
  }),
});

export default roleApi;
export const { useGetAllRolesQuery } = roleApi;
