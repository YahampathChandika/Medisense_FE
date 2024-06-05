import api from "./api";

export const xrayApi = api.injectEndpoints({
  reducerPath: "xrayApi",
  endpoints: (builder) => ({
    getXrayList: builder.query({
      query: () => "xRay/getXRayList",
    }),
    getXrayDropdown: builder.query({
      query: () => "dropdown/getXRayStatus",
    }),
    getRadioGraphers: builder.query({
      query: () => "dropdown/getRadioGraphers",
    }),

    updateXrayStatus: builder.mutation({
      query: ({ data, customerId, admissionId }) => ({
        url: `xRay/updateXrayStatus/${customerId}/${admissionId}`,
        method: "PATCH",
        body: data,
      }),
    }),
    getCustomerListXray: builder.query({
      query: ({ customerId, admissionId }) =>
        `xRay/getCustomer/${customerId}/${admissionId}`,
    }),
  }),
});

export const {
  useGetXrayListQuery,
  useGetXrayDropdownQuery,
  useGetRadioGraphersQuery,
  useGetCustomerListXrayQuery,
  useUpdateXrayStatusMutation,
} = xrayApi;
