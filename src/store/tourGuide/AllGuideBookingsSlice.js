import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AllGuideBookingsSlice = createApi({
    reducerPath: 'AllGuideBookingsSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        fetchTourBookings: builder.mutation({
            query: (body) => ({
                url: 'tour-Guide/bookings',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useFetchTourBookingsMutation } = AllGuideBookingsSlice;
