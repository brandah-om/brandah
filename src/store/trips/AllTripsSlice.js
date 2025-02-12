import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AllTripsSlice = createApi({
  reducerPath: 'tripsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: (builder) => ({
    getTrips: builder.query({
      query: (lang) => `trips?lang=${lang}`,
    }),
  }),
});

export const { useGetTripsQuery } = AllTripsSlice;
