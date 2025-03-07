import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ResendOtpApiSlice = createApi({
    reducerPath: 'ResendOtpApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        resendOtp: builder.mutation({
            query: (userData) => ({
                url: 'resend-otp',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const { useResendOtpMutation } = ResendOtpApiSlice;
