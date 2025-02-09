import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const MicePageSlice = createApi({
    reducerPath: 'MicePageApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: builder => ({
        getMicePage: builder.query({
            query: () => 'pages',
            transformResponse: response => {
                const MicePage = response.data.find(page => page.name === 'mice');
                return MicePage ? MicePage : {};
            },
        }),
    }),
});

export const { useGetMicePageQuery } = MicePageSlice;
