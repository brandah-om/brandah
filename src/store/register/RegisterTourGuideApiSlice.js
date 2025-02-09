import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const RegisterTourGuideApiSlice = createApi({
    reducerPath: 'RegisterTourGuideApi',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        credentials: 'include',
    }),
    endpoints: (builder) => ({
        registerTourGuide: builder.mutation({
            query: (userData) => ({
                url: 'tour-guides/register',
                method: 'POST',
                body: userData,
            }),
        }),
    }),
});

export const { useRegisterTourGuideMutation } = RegisterTourGuideApiSlice;
