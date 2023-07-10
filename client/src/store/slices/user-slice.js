import { createSlice } from "@reduxjs/toolkit";
import companyApi from "../services/company-service";

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default userSlice.reducer;
