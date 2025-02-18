import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const checkPaymentStatus = createApi({
    reducerPath: 'checkPaymentStatus',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
    }),
    endpoints: (builder) => ({
        checkPaymentStatus: builder.mutation({
            query: (sessionId) => ({
                url: 'payments/check',
                method: 'POST',
                body: { session_id: sessionId },
            }),
        }),
    }),
});

export const { useCheckPaymentStatusMutation } = checkPaymentStatus;
