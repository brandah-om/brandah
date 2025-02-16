import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const RegisterAgencyApiSlice = createApi({
    reducerPath: 'RegisterAgencyApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        registerAgency: builder.mutation({
            query: (userData) => ({
                url: 'agency/register',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const { useRegisterAgencyMutation } = RegisterAgencyApiSlice;
