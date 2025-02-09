import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const TransDetailsSlice = createApi({
    reducerPath: 'TransDetailsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getTranssBtId: builder.query({
            query: (id) => `transportation/${id}`,
        }),
    }),
});

export const { useGetTranssBtIdQuery } = TransDetailsSlice;
