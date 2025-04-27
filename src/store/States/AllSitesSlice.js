import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AllSitesSlice = createApi({
    reducerPath: 'AllSitesByStatesByCategoryApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getAllSites: builder.query({
            query: ({ state_id, category_id, lang }) => `state/sites?state_id=${state_id}&category_id=${category_id}?lang=${lang}`,
        }),
    }),
});

export const { useGetAllSitesQuery } = AllSitesSlice;
