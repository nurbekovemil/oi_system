import { createSlice } from "@reduxjs/toolkit";
import companyApi from "../services/company-service";

const initialState = {
  companies: [],
};

const companySlice = createSlice({
  name: "company",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      companyApi.endpoints.getCompanies.matchFulfilled,
      (state, action) => {
        console.log(action.payload);
      }
    );
  },
});

export default companySlice.reducer;
