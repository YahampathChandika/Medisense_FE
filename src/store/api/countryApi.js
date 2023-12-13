import api from "./api";

export const countryApi = api.injectEndpoints({
  reducerPath: "countryApi",
  endpoints: (builder) => ({
    addCountry: builder.mutation({
      query: (data) => ({
        url: "country/registerCountry",
        method: "POST",
        body: data,
      }),
    }),

    getAllCountries: builder.query({
      query: () => "country/getAllCountries",
    }),

    getGccCountries: builder.query({
      query: () => "country/getGccCountries",
    }),

    getNonGccCountries: builder.query({
      query: () => "country/getNonGccCountries",
    }),
  }),
});

export const {
  useAddCountryMutation,
  useGetAllCountriesQuery,
  useGetGccCountriesQuery,
  useGetNonGccCountriesQuery,
} = countryApi;
