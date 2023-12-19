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
  }),
});

export const { useAddCustomerMutation } = customerApi;
