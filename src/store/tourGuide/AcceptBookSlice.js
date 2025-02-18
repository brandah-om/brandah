import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AcceptBookSlice = createApi({
    reducerPath: 'AcceptBookSlice',
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
        acceptTourBookings: builder.mutation({
            query: (body) => ({
                url: 'accept-booking-for-tour-guide',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useAcceptTourBookingsMutation } = AcceptBookSlice;
