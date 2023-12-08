import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3002/" }),

  reducerPath: "authApi",
  endpoints: (build) => ({
    loginUser: build.mutation({
      query: (data) => {
        console.log('login using ', data);
        return {
          url: "user/login",
          method: "POST",
          body: data,
        };
      },
    }),
  }),
});

export const { useLoginUserMutation } = authApi;
