import api from "./api";

export const minilabApi = api.injectEndpoints({
    reducerPath: "minilabApi",
    endpoints: (builder) => ({
        getMinilabList: builder.query({
            query: () => "miniLab/getMiniLabList"
        }),
    })
});


export const { useGetMinilabListQuery } = minilabApi;

