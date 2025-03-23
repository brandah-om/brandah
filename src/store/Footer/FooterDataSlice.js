import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const FooterDataSlice = createApi({
    reducerPath: 'FooterDataSlice',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getFooterData: builder.query({
            query: (lang) => `footer?lang=${lang}`, 
        }),
    }),
});

export const { useGetFooterDataQuery } = FooterDataSlice;
