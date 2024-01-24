import { api } from "../api";

const searchApi = api.injectEndpoints({
  endpoints: (builder) => ({
    globalSearch: builder.query({
      query: (value) => `search?value=${value}`,
    }),
  }),
});

export default searchApi;
export const { useLazyGlobalSearchQuery } = searchApi;
