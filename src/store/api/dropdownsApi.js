import api from "./api";

export const dropdownApi = api.injectEndpoints({
  reducerPath: "dropdownApi",
  endpoints: (builder) => ({
    getPaymentMethods: builder.query({
      query: () => "dropdown/getPaymentMethods",
    }),
  }),
});

export const { useGetPaymentMethodsQuery } = dropdownApi;
