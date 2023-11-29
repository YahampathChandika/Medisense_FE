import api from './api'

// Define a service using a base URL and expected endpoints
export const addGccApi = api.injectEndpoints({
  reducerPath: 'addGccApi',
  endpoints: (builder) => ({
    addGcc: builder.mutation ({
        query: (data) => ({
            url: "addGcc",
            method: "POST",
            body: data
        })
    })
  }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useAddGccMutation } = addGccApi