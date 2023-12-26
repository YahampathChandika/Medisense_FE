import api from "./api";

export const cashierApi = api.injectEndpoints({
  reducerPath: "cashierApi",
  endpoints: (builder) => ({
    getCashierList: builder.query({
      query: () => "cashier/getCashierList",
    }),

    getCashierListMatrices: builder.query({
      query: () => "cashier/getCashierListMatrices",
    }),

    getCustomer: builder.query({
      query: ({ customerId, admissionId }) =>
        `cashier/getCustomerWithTestsAndPackages/${customerId}/${admissionId}`,
    }),
  }),
});

export const {
  useGetCashierListQuery,
  useGetCashierListMatricesQuery,
  useGetCustomerQuery,
} = cashierApi;
