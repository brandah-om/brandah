import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const TripsDetailsSlice = createApi({
    reducerPath: 'tripsDetailsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getTripsBtId: builder.query({
            query: (id, lang) => `trip/${id}?lang=${lang}`,
        }),
    }),
});

export const { useGetTripsBtIdQuery } = TripsDetailsSlice;
