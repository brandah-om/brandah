import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const TripBookingSlice = createApi({
    reducerPath: 'TripBookingSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        credentials: 'include',
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            } else {
                console.warn("⚠️ No token found in localStorage!");
            }
            headers.set('Accept', 'application/json');
            return headers;
        }
    }),
    endpoints: (builder) => ({
        BookTrip: builder.mutation({
            query: ({ id, userData }) => ({
                url: `trip-book/${id}`,
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const { useBookTripMutation } = TripBookingSlice;
