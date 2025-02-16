import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const RegisterTransportationApiSlice = createApi({
    reducerPath: 'RegisterTransportationApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        registerTransportation: builder.mutation({
            query: (userData) => ({
                url: 'transportation/register',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const { useRegisterTransportationMutation } = RegisterTransportationApiSlice;
