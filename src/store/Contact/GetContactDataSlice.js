import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const GetContactDataSlice = createApi({
    reducerPath: 'ContactDataApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getContactData: builder.query({
            query: (lang) => `contact/common-questions?lang=${lang}`,
        }),
    }),
});

export const { useGetContactDataQuery } = GetContactDataSlice;
