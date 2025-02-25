import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const SearchSlice = createApi({
    reducerPath: 'SearchSliceApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getSearch: builder.query({
            query: ({ query, type, lang }) => ({
                url: `search`,
                params: { query, type, lang }, 
            }),
        }),
    }),
});

export const { useGetSearchQuery } = SearchSlice;