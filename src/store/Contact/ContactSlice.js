import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const ContactSlice = createApi({
    reducerPath: 'ContactSliceApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        ContactSlice: builder.mutation({
            query: (userData) => ({
                url: 'contact',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const { useContactSliceMutation } = ContactSlice;
