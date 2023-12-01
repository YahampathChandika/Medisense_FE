import api from "./api";

export const addGccApi = api.injectEndpoints({
  reducerPath: "addGccApi",
  endpoints: (builder) => ({
    addGcc: builder.mutation({
      query: (data) => ({
        url: "addGcc",
        method: "POST",
        body: data,
      }),
    }),
    addOpd: builder.mutation({
      query: (data) => ({
        url: "addOpd",
        method: "POST", 
        body: data,
      }),
    }),
  }),
});

export const { useAddGccMutation, useAddOpdMutation } = addGccApi;
