import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const HotelsByDestinationSlice = createApi({
    reducerPath: 'hotelStateDetailsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getHotelStatesBtId: builder.query({
            query: (id, lang) => `state/hotels/${id}?lang=${lang}`,
        }),
    }),
});

export const { useGetHotelStatesBtIdQuery } = HotelsByDestinationSlice;
