import api from "./api";

export const userApi = api.injectEndpoints({
  reducerPath: "userApi",
  endpoints: (builder) => ({
    addUser: builder.mutation({
      query: (data) => {
        console.log("Data before making API call:", data);
        return {
          url: "user/registerUser",
          method: "POST",
          body: data,
        };
      },
    }),

    getUserRoles: builder.query({
      query: () => "user/getUserRoles",
    }),

    getAllUsers: builder.query({
      query: () => "user/getAllUsers",
    }),

    getSignedUser: builder.query({
      query: () => "user/getSignedUser",
    }),

    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `user/deleteUser/${userId}`,
        method: "DELETE",
      }),
    }),

    getUserByID: builder.query({
      query: (id) => `user/getUserById/${id}`,
    }),


    updateUser: builder.mutation({
      query: ({ id, inputData }) => {
        console.log("Data before making API call:", id, inputData);
        return {
          url: `user/updateUser/${id}`,
          method: "PATCH",
          body: inputData,
        };
      },
    }),

    // updateUser: builder.mutation({
    //   query: ({ id, inputData }) => ({
    //     url: `user/updateUser/${id}`,
    //     method: "PATCH",
    //     body: inputData,
    //   }),
    // }),
  }),
});

export const {
  useAddUserMutation,
  useGetUserRolesQuery,
  useGetAllUsersQuery,
  useGetSignedUserQuery,
  useDeleteUserMutation,
  useGetUserByIDQuery,
  useUpdateUserMutation,
} = userApi;
