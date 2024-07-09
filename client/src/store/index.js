import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import authSlice from "./slices/auth-slice";
import companySlice from "./slices/company-slice";
import userSlice from "./slices/user-slice";
import reportSlice from "./slices/report-slice";
import messageSlice from "./slices/message-slice";
import searchSlice from "./slices/search-slice";
import contractSlice from "./slices/contract-slice";

const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authSlice,
    company: companySlice,
    user: userSlice,
    report: reportSlice,
    message: messageSlice,
    search: searchSlice,
    contract: contractSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
