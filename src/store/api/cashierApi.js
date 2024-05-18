import api from "./api";

export const cashierApi = api.injectEndpoints({
  reducerPath: "cashierApi",
  endpoints: (builder) => ({
    addPayment: builder.mutation({
      query: ({ customerId, admissionId, data }) => {
        console.log(
          "Data before making API call:",
          customerId,
          admissionId,
          data
        );
        return {
          url: `cashier/addCustomerPayment/${customerId}/${admissionId}`,
          method: "PATCH",
          body: data,
        };
      },
    }),

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
  useAddPaymentMutation,
  useGetCashierListQuery,
  useGetCashierListMatricesQuery,
  useGetCustomerQuery,
} = cashierApi;
