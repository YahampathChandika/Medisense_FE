import api from "./api";

export const minilabApi = api.injectEndpoints({
  reducerPath: "minilabApi",
  endpoints: (builder) => ({
    getMinilabList: builder.query({
      query: () => "miniLab/getMiniLabList",
    }),

    updateMiniLabStatus: builder.mutation({
      query: ({ customerId, admissionId, data }) => ({
        url: `miniLab/updateMiniLabStatus/${customerId}/${admissionId}`,
        method: "PATCH",
        body: data,
      }),
    }),

    getMinilabgetCustomer: builder.query({
      query: ({ customerId, admissionId }) => 
        `miniLab/getCustomer/${customerId}/${admissionId}`,
    }),
  }),
});

export const {
  useGetMinilabListQuery,
  useUpdateMiniLabStatusMutation,
  useGetMinilabgetCustomerQuery,
} = minilabApi;
