import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AboutPageSlice = createApi({
    reducerPath: 'AboutPageApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: builder => ({
        getAboutPage: builder.query({
            query: () => 'pages',
            transformResponse: response => {
                const aboutPage = response.data.find(page => page.name === 'about');
                return aboutPage ? aboutPage : {};
            },
        }),
    }),
});

export const { useGetAboutPageQuery } = AboutPageSlice;
