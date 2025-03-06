import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const forgetPasswordSlice = createApi({
    reducerPath: 'forgetPassword',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        forgetPass: builder.mutation({
            query: (userData) => ({
                url: 'forget-pass',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const { useForgetPassMutation } = forgetPasswordSlice;
