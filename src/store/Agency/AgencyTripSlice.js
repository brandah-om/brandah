import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AgencyTripSlice = createApi({
    reducerPath: 'AgencyTripsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getAgencyTrip: builder.query({
            query: ({ id, lang }) => `trips-by-agency/${id}?lang=${lang}`,
        }),
    }),
});

export const { useGetAgencyTripQuery } = AgencyTripSlice;
