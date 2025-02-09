import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AlllanguagesSlice = createApi({
    reducerPath: 'LanguageApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getLanguage: builder.query({
            query: () => 'website-languages',
        }),
    }),
});

export const { useGetLanguageQuery } = AlllanguagesSlice;
