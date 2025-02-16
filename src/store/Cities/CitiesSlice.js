import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const CitiesApiSlice = createApi({
    reducerPath: 'CitiesApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getCities: builder.query({
            query: (lang) => `cities?lang=${lang}`,
        }),
    }),
});

export const { useGetCitiesQuery } = CitiesApiSlice;
