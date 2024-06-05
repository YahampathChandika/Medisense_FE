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
      query: ({ customerId, admissionId, data }) => {
        // Log the variables
        console.log(
          "customerId:",
          customerId,
          "admissionId:",
          admissionId,
          "data:",
          data
        );

        // Return the request configuration
        return {
          url: `xRay/updateXrayStatus/${customerId}/${admissionId}`,
          method: "PATCH",
          body: data,
        };
      },
    }),
  }),
});

export const {
  useGetXrayListQuery,
  useGetXrayDropdownQuery,
  useGetRadioGraphersQuery,
  useUpdateXrayStatusMutation,
} = xrayApi;
