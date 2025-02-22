import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ApplyCodeUserSlice = createApi({
    reducerPath: 'ApplyCodeUserSlice',
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
        createApplyCode: builder.mutation({
            query: (formDataCoupon) => ({
                url: 'user/apply-code',
                method: 'POST',
                body: formDataCoupon,
            }),
        }),
    }),
});

export const { useCreateApplyCodeMutation } = ApplyCodeUserSlice;
