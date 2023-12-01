import { configureStore } from "@reduxjs/toolkit";
import api from "./api/api";
import { addGccApi } from "./api/addGcc";
import { agencyApi } from "./agencyApi";

  
export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [addGccApi.reducerPath]: addGccApi.reducer,
    [agencyApi.reducerPath]: agencyApi.reducer,
   
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      api.middleware,
      addGccApi.middleware,
      agencyApi.middleware,
    );
  },
});
