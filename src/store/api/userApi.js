import api from "./api";

export const userApi = api.injectEndpoints({
    reducerPath:"userApi",
    endpoints:(builder) => ({
        addUser:builder.mutation({
            query:(data) => ({
                url:"user",
                method:"POST",
                body:data,
            })
        }),

    })
})

export const { useAddUserMutation } = userApi ;