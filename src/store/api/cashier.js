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
  }),
});

export const {
  useGetCashierListQuery,
  useGetCashierListMatricesQuery,
} = cashierApi;
