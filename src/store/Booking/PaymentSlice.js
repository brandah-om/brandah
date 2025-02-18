import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const PaymentSlice = createApi({
    reducerPath: 'PaymentSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        prepareHeaders: (headers) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        createPaymentSession: builder.mutation({
            query: (formData) => ({
                url: 'payments/create-session',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

export const { useCreatePaymentSessionMutation } = PaymentSlice;
