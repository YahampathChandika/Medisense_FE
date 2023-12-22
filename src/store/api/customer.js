import api from "./api";

export const customerApi = api.injectEndpoints({
  reducerPath: "customerApi",
  endpoints: (builder) => ({
    addCustomer: builder.mutation({
      query: (data) => {
        console.log("Data before making API call:", data);
        return {
          url: "customer/registerCustomer",
          method: "POST",
          body: data,
        };
      },
    }),
    addPackageAndTest: builder.mutation({
      query: ({ data, customerId, admissionId }) => ({
        url: `customer/addCustomerTestsAndPackages/${customerId}/${admissionId}`,
        method: "POST",
        body: data,
      }),
    }),

    getAllCustomers: builder.query({
      query: () => "customer/getAllCustomers",
    }),

    getCustomerByID: builder.query({
      query: (id) => `customer/getCustomerById/${id}`,
    }),

    deleteCustomer: builder.mutation({
      query: (customerId) => ({
        url: `customer/deleteCustomerById/${customerId}`,
        method: "DELETE",
      }),
    }),

    updateCustomer: builder.mutation({
      query: ({ id, inputData }) => {
        console.log("Data before making API call:", id, inputData);
        return {
          url: `customer/updateCustomer/${id}`,
          method: "PATCH",
          body: inputData,
        };
      },
    }),
  }),
});

export const {
  useAddCustomerMutation,
  useAddPackageAndTestMutation,
  useGetAllCustomersQuery,
  useGetCustomerByIDQuery,
  useDeleteCustomerMutation,
  useUpdateCustomerMutation,
} = customerApi;
