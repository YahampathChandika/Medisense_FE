import api from "./api";

export const testApi = api.injectEndpoints({
  reducerPath: "testApi",
  endpoints: (builder) => ({
    getAllTests: builder.query({
      query: () => "test/getAllTests",
    }),

    getTestById: builder.query({
      query: (testId) => `test/updateTest/${testId}`,
    }),

    deleteTest: builder.mutation({
      query: (testId) => ({
        url: `test/deleteTest/${testId}`,
        method: "DELETE",
      }),
    }),

    updateTest: builder.mutation({
      query: ({ updatedData, id }) => ({
        url: `test/updateTest/${id}`,
        method: "PUT",
        body: updatedData,
      }),
    }),

    addTest: builder.mutation({
      query: (data) => ({
        url: "/test/addTest",
        method: "POST",
        body: data,
      }),
    }),

  }),
});

export const {
  useGetAllTestsQuery,
  useDeleteTestMutation,
  useGetTestByIdQuery,
  useUpdateTestMutation,
  useAddTestMutation,
} = testApi;
