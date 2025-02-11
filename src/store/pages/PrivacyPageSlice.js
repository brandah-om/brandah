import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const PrivacyPageSlice = createApi({
    reducerPath: 'PrivacyPageApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: builder => ({
        getPrivacyPage: builder.query({
            query: (lang) => `pages?lang=${lang}`,
            transformResponse: response => {
                const PrivacyPage = response.data.find(page => page.name === 'privacy');
                return PrivacyPage ? PrivacyPage : {};
            },
        }),
    }),
});

export const { useGetPrivacyPageQuery } = PrivacyPageSlice;
