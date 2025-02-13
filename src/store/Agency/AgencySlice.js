import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AgencySlice = createApi({
    reducerPath: 'AgencyApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getAgency: builder.query({
            query: (lang) => `agencies?lang=${lang}`,
        }),
    }),
});

export const { useGetAgencyQuery } = AgencySlice;
