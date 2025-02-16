import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const CountriesApiSlice = createApi({
  reducerPath: 'CountriesApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: (builder) => ({
    getCountries: builder.query({
      query: (lang) => `countries?lang=${lang}`,
    }),
  }),
});

export const { useGetCountriesQuery } = CountriesApiSlice;
