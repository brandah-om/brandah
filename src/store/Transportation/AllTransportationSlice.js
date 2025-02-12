import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AllTransportationSlice = createApi({
    reducerPath: 'TransportationApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getTransportation: builder.query({
            query: (lang) => `transportations?lang=${lang}`,
        }),
    }),
});

export const { useGetTransportationQuery } = AllTransportationSlice;
