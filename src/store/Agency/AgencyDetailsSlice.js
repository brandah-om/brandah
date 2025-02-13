import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const AgencyDetailsSlice = createApi({
    reducerPath: 'AgencyDetailsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getAgencysBtId: builder.query({
            query: ({ id, lang }) => `agency/${id}?lang=${lang}`,
        }),
    }),
});

export const { useGetAgencysBtIdQuery } = AgencyDetailsSlice;
