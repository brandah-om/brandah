
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const siteDetailApi = createApi({
    reducerPath: 'siteDetailApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getSiteDetail: builder.query({
            query: ({ museumId, lang }) => `site/${museumId}?lang=${lang}`,
        }),
    }),
});

export const { useGetSiteDetailQuery } = siteDetailApi;
