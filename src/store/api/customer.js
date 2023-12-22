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
    
  }),
});

export const { useAddCustomerMutation, useAddPackageAndTestMutation } =
  customerApi;

