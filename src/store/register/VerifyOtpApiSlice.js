import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const VerifyOtpApiSlice = createApi({
    reducerPath: 'VerifyOtpApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        verifyOtp: builder.mutation({
            query: (userData) => ({
                url: 'verify-otp',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const { useVerifyOtpMutation } = VerifyOtpApiSlice;
