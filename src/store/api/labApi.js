import api from "./api";

export const labApi = api.injectEndpoints({
  reducerPath: "labApi",
  endpoints: (builder) => ({
    getLabList: builder.query({
      query: () => "lab/getLabList",
    }),
  }),
});

export const { useGetLabListQuery } = labApi;
