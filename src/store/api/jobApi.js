import api from "./api";

export const jobApi = api.injectEndpoints({
  reducerPath: "jobApi",
  endpoints: (builder) => ({
    addJob: builder.mutation({
      query: (data) => ({
        url: "job/addJob",
        method: "POST",
        body: data,
      }),
    }),

    getAllJobs: builder.query({
      query: () => "job/getAllJobs",
    }),
  }),
});

export const { useAddJobMutation, useGetAllJobsQuery } = jobApi;
