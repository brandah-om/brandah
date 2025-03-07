import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const resetPasswordSlice = createApi({
    reducerPath: 'resetPassword',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        resetPass: builder.mutation({
            query: (userData) => ({
                url: 'reset-password',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const { useResetPassMutation } = resetPasswordSlice;
