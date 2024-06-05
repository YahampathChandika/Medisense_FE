import api from "./api";

export const dropdownApi = api.injectEndpoints({
  reducerPath: "dropdownApi",
  endpoints: (builder) => ({
    getPaymentMethods: builder.query({
      query: () => "dropdown/getPaymentMethods",
    }),
    getBanks: builder.query({
      query: () => "dropdown/getBanks",
    }),
    getCreditApprovers: builder.query({
      query: () => "dropdown/getCreditApprovers",
    }),
  }),
});

export const {
  useGetPaymentMethodsQuery,
  useGetBanksQuery,
  useGetCreditApproversQuery,
} = dropdownApi;
