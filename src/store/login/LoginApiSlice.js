import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const LoginApiSlice = createApi({
    reducerPath: 'LoginApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (userData) => ({
                url: 'login',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const { useLoginMutation } = LoginApiSlice;
