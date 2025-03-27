import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AllStatesSlice = createApi({
    reducerPath: 'AllStates',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getAllStates: builder.query({
            query: (lang) => `states?lang=${lang}`, 
        }),
    }),
});

export const { useGetAllStatesQuery } = AllStatesSlice;
