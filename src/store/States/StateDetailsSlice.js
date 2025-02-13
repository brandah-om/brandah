import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const StateDetailsSlice = createApi({
    reducerPath: 'StateDetailsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getStatesBtId: builder.query({
            query: ({id, lang}) => `state-details/${id}?lang=${lang}`,
        }),
    }),
});

export const { useGetStatesBtIdQuery } = StateDetailsSlice;
