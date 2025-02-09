import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const RegisterTouristApiSlice = createApi({
    reducerPath: 'RegisterTouristApi',
    baseQuery: fetchBaseQuery({ 
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        credentials: 'include', 
    }),
    endpoints: (builder) => ({
        registerTourist: builder.mutation({
            query: (userData) => ({
                url: 'user/register',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const { useRegisterTouristMutation } = RegisterTouristApiSlice;
