import { configureStore } from "@reduxjs/toolkit";
import api from "./api/api";
import { addGccApi } from "./api/addGcc";
import { agencyApi } from "./api/agencyApi";
import { userApi } from "./api/userApi";
import { authApi } from "./api/authApi";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [addGccApi.reducerPath]: addGccApi.reducer,
    [agencyApi.reducerPath]: agencyApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      api.middleware,
      authApi.middleware,
      addGccApi.middleware,
      agencyApi.middleware,
      userApi.middleware
    );
  },
});
