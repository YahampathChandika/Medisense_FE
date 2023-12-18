import { configureStore } from "@reduxjs/toolkit";
import api from "./api/api";
import { agencyApi } from "./api/agencyApi";
import { userApi } from "./api/userApi";
import { authApi } from "./api/authApi";
import { countryApi } from "./api/countryApi";
import { jobApi } from "./api/jobApi";
import selectedTestsReducer from "./slice/testSlice";
import { customerApi } from "./api/customer";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [agencyApi.reducerPath]: agencyApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [countryApi.reducerPath]: countryApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,

    selectedTests: selectedTestsReducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      api.middleware,
      authApi.middleware,
      customerApi.middleware,
      agencyApi.middleware,
      userApi.middleware,
      countryApi.middleware,
      jobApi.middleware,
    );
  },
});
