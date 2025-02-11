import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FaqPageSlice = createApi({
    reducerPath: 'FaqPageApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: builder => ({
        getFaqPage: builder.query({
            query: (lang) => `pages?lang=${lang}`,
            transformResponse: response => {
                const FaqPage = response.data.find(page => page.name === 'faq');
                return FaqPage ? FaqPage : {};
            },
        }),
    }),
});

export const { useGetFaqPageQuery } = FaqPageSlice;
