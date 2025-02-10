import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const DestinationDetailsSlice = createApi({
    reducerPath: 'DestinationDetailsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getDestinationDetails: builder.query({
            query: (id) => `state/${id}`,
        }),
    }),
});

export const { useGetDestinationDetailsQuery } = DestinationDetailsSlice;
