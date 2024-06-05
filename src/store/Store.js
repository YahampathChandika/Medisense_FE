import { configureStore } from "@reduxjs/toolkit";
import api from "./api/api";
import { agencyApi } from "./api/agencyApi";
import { userApi } from "./api/userApi";
import { authApi } from "./api/authApi";
import { countryApi } from "./api/countryApi";
import { jobApi } from "./api/jobApi";
import selectedTestsReducer from "./slice/testSlice";
import selectedPackageReducer from "./slice/selectPackageSlice";
import { customerApi } from "./api/customerApi";
import { dropdownApi } from "./api/dropdownsApi";
import { cashierApi } from "./api/cashierApi";
import { testApi } from "./api/testApi";
import { minilabApi } from "./api/minilabApi";
import { xrayApi } from "./api/xray";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [customerApi.reducerPath]: customerApi.reducer,
    [agencyApi.reducerPath]: agencyApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [countryApi.reducerPath]: countryApi.reducer,
    [jobApi.reducerPath]: jobApi.reducer,
    [dropdownApi.reducerPath]: dropdownApi.reducer,
    [cashierApi.reducerPath]: cashierApi.reducer,
    [testApi.reducerPath]: testApi.reducer,
    [minilabApi.reducerPath]: minilabApi.reducer,
    [xrayApi.reducerPath]: xrayApi.reducer,

    selectedTests: selectedTestsReducer,
    selectPackage: selectedPackageReducer,
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
      dropdownApi.middleware,
      testApi.middleware,
      cashierApi.middleware,
      minilabApi.middleware,
      xrayApi.middleware
    );
  },
});
 