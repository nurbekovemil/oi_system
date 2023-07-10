import { createSlice } from "@reduxjs/toolkit";
import companyApi from "../services/company-service";

const initialState = {
  reports: [],
};

const reportSlice = createSlice({
  name: "report",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default reportSlice.reducer;
