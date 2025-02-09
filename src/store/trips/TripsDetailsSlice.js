import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const TripsDetailsSlice = createApi({
    reducerPath: 'tripsDetailsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getTripsBtId: builder.query({
            query: (id) => `trip/${id}`,
        }),
    }),
});

export const { useGetTripsBtIdQuery } = TripsDetailsSlice;
