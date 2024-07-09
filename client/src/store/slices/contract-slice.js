import { createSlice } from "@reduxjs/toolkit";
import contractApi from "../services/contract-service";

const initialState = {

};

const contractSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    
  },
});

export default contractSlice.reducer;
