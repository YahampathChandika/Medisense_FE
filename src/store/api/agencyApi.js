import api from "./api";

export const agencyApi = api.injectEndpoints({
  reducerPath: "agencyApi",
  endpoints: (builder) => ({
    addAgency: builder.mutation({
      query: (data) => ({
        url: "addAgency",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useAddAgencyMutation } = agencyApi;
