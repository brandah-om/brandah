import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const TermsPageSlice = createApi({
    reducerPath: 'TermsPageApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: builder => ({
        getTermsPage: builder.query({
            query: (lang) => `pages?lang=${lang}`,
            transformResponse: response => {
                const TermsPage = response.data.find(page => page.name === 'terms');
                return TermsPage ? TermsPage : {};
            },
        }),
    }),
});

export const { useGetTermsPageQuery } = TermsPageSlice;
