import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AllTourGuideApiSlice = createApi({
    reducerPath: 'TourGuideApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getTourGuide: builder.query({
            query: () => 'tour-Guides',
        }),
    }),
});

export const { useGetTourGuideQuery } = AllTourGuideApiSlice;
