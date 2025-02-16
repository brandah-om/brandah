import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const PaymentMethodSlice = createApi({
    reducerPath: 'PaymentMethodApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getPaymentMethod: builder.query({
            query: (lang) => `payment-methods?lang=${lang}`,
        }),
    }),
});

export const { useGetPaymentMethodQuery } = PaymentMethodSlice;
