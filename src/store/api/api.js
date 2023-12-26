import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// Initialize an empty api service that we'll inject endpoints into later as needed
export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3002/',
        // baseUrl: 'http://44.208.32.102:3001/',

        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token'); 
            // console.log("hello "+token)         
            if (token) {
                headers.set('Authorization', `Bearer ${token}`)
            }
            return headers;
        }
    }),
    endpoints: () => ({}),
});

export default api;