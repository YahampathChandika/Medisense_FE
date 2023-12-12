import api from "./api";

export const testApi = api.injectEndpoints({
  reducerPath: "testApi",
  endpoints: (builder) => ({
    getAllTests: builder.query({
      query: () => "test/getAllTests",
    }),

    getTestById: builder.query({
      query: (testId) => `test/getTestById/${testId}`,
    }),

    deleteTest: builder.mutation({
      query: (testId) => ({
        url: `test/deleteTest/${testId}`,
        method: "DELETE",
      }),
    }),

    updateTest: builder.mutation({
      query: ({ id, updatedData }) => ({
        url: `test/updateTest/${id}`,
        method: "PATCH",
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

    createPackage: builder.mutation({
      query: (data) => ({
        url: "package/createPackage",
        method: "POST",
        body: data,
      }),
    }),

    getAllPackages: builder.query({
      query: () => "package/getAllPackages",
    }),

    deletePackage: builder.mutation({
      query: (packageId) => ({
        url: `package/deletePackage/${packageId}`,
        method: "DELETE",
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
  useCreatePackageMutation,
  useGetAllPackagesQuery,
  useDeletePackageMutation,
} = testApi;
