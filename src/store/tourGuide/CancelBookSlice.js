import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const CancelBookSlice = createApi({
    reducerPath: 'CancelBookSlice',
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
        CancelTourBookings: builder.mutation({
            query: (body) => ({
                url: 'cancel-booking-for-tour-guide',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useCancelTourBookingsMutation } = CancelBookSlice;
