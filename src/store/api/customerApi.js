import api from "./api";

export const customerApi = api.injectEndpoints({
  reducerPath: "customerApi",
  endpoints: (builder) => ({
    addCustomer: builder.mutation({
      query: (formData) => {
        console.log("Data before making API call:", formData);
        return {
          url: "customer/registerCustomer",
          method: "POST",
          body: formData,
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

    getCustomerResults: builder.query({
      query: ({ customerId, admissionId }) => `customer/getCustomerResults/${customerId}/${admissionId}`,
      // query: () => "customer/getCustomerResults/44/41",
    }),

    getCustomerMatrix: builder.query({
      query: () => "customer/getCustomerMatrices",
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
  useGetCustomerMatrixQuery,
  useGetAllCustomersQuery,
  useGetCustomerByIDQuery,
  useGetCustomerResultsQuery,
  useDeleteCustomerMutation,
  useUpdateCustomerMutation,
} = customerApi;
