import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const SubscribeSlice = createApi({
    reducerPath: 'SubscribeSlice',
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
        createSubscribe: builder.mutation({
            query: (formData) => ({
                url: 'subscribe',
                method: 'POST',
                body: formData,
            }),
        }),
    }),
});

export const { useCreateSubscribeMutation } = SubscribeSlice;
