import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const SitesCategorySlice = createApi({
    reducerPath: 'SiteDetailsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getSite: builder.query({
            query: (lang) => `sites-categories?lang=${lang}`,
        }),
    }),
});

export const { useGetSiteQuery } = SitesCategorySlice;
