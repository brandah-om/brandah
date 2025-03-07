import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const TourGuideDaysSlice = createApi({
    reducerPath: 'GuideDaysApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getGuidesById: builder.query({
            query: ({ id, lang }) => `tour-guides/${id}/availability?lang=${lang}`,
        }),
    }),
});

export const { useGetGuidesByIdQuery } = TourGuideDaysSlice;
