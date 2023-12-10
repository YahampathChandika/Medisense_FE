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

    getAllUsers : builder.query ({
      query:()=>"user/getAllUsers"

    })
  }),
});

export const { useAddUserMutation, useGetUserRolesQuery  , useGetAllUsersQuery } = userApi;
