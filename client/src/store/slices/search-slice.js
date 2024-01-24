import { createSlice } from "@reduxjs/toolkit";
import searchApi from "../services/search-service";

const initialState = {
  users: [],
  reports: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      searchApi.endpoints.globalSearch.matchFulfilled,
      (state, { payload }) => {
        const { reports, users } = payload;
        if (reports) {
          state.reports = reports;
        }
        if (users) {
          state.users = users;
        }
      }
    );
  },
});

export default searchSlice.reducer;
