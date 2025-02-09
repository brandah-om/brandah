import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const hotelDetailsApiSlice = createApi({
    reducerPath: 'hotelDetailsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getHotelsBtId: builder.query({
            query: (id) => `hotel-details/${id}`,
        }),
    }),
});

export const { useGetHotelsBtIdQuery } = hotelDetailsApiSlice;
