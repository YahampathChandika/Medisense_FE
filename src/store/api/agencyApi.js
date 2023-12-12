import api from "./api";

export const agencyApi = api.injectEndpoints({
  reducerPath: "agencyApi",
  endpoints: (builder) => ({
    addAgency: builder.mutation({
      query: (data) => ({
        url: "agency/addAgency",
        method: "POST",
        body: data,
      }),
    }),

    getAllAgency: builder.query({
      query: () => "agency/getAllAgencies",
    }),

    getAgencyByID: builder.query({
      query: (id) => `agency/getAgencyById/${id}`,
    }),

    updateAgency: builder.mutation({
      query: ({ id, inputData }) => ({
        url: `agency/updateAgency/${id}`,
        method: "PATCH",
        body: inputData,
      }),
    }),

    deleteAgency: builder.mutation({
      query: (id) => ({
        url: `/agency/deleteAgency/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddAgencyMutation,
  useGetAllAgencyQuery,
  useGetAgencyByIDQuery,
  useUpdateAgencyMutation,
  useDeleteAgencyMutation,
} = agencyApi;
