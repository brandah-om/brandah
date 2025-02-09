import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const hotelsApiSlice = createApi({
  reducerPath: 'hotelsApi',
  baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
  endpoints: (builder) => ({
    getHotels: builder.query({
      query: () => 'hotels',
    }),
  }),
});

export const { useGetHotelsQuery } = hotelsApiSlice;
