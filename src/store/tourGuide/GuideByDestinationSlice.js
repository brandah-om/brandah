import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const GuideByDestinationSlice = createApi({
    reducerPath: 'GuideStateDetailsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getGuideStatesBtId: builder.query({
            query: ({id, lang}) => `state/${id}/tour-guides?lang=${lang}`,
        }),
    }),
});

export const { useGetGuideStatesBtIdQuery } = GuideByDestinationSlice;
