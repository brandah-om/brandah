import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const HomePageSlice = createApi({
    reducerPath: 'HomePageApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getHomePage: builder.query({
            query: (lang) => `home?lang=${lang}`, 
        }),
    }),
});

export const { useGetHomePageQuery } = HomePageSlice;
