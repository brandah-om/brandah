import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const GuideLanguageSlice = createApi({
    reducerPath: 'GuideLanguageApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getGuideLanguage: builder.query({
            query: () => 'tour-guide-languages',
        }),
    }),
});

export const { useGetGuideLanguageQuery } = GuideLanguageSlice;
