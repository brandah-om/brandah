import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const TourGuideDetailsSlice = createApi({
    reducerPath: 'GuideDetailsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getGuidesBtId: builder.query({
            query: ({id, lang}) => `tour-Guide-details/${id}?lang=${lang}`,
        }),
    }),
});

export const { useGetGuidesBtIdQuery } = TourGuideDetailsSlice;
