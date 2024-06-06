import api from "./api";

export const labApi = api.injectEndpoints({
  reducerPath: "labApi",
  endpoints: (builder) => ({
    getLabList: builder.query({
      query: () => "lab/getLabList",
    }),

    getLabCustomer: builder.query({
      query: ({ customerId, admissionId }) =>
        `lab/getCustomer/${customerId}/${admissionId}`,
    }),

    updateLabStatus: builder.mutation({
      query: ({ customerId, admissionId, data }) => {
        // Log the data before making the request
        console.log('Updating lab status with:', { customerId, admissionId, data });
        return {
          url: `lab/updateLabResults/${customerId}/${admissionId}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
    
  }),
});

export const {
  useGetLabListQuery,
  useGetLabCustomerQuery,
  useUpdateLabStatusMutation,
} = labApi;
