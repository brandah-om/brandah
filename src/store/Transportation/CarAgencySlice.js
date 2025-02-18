import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const CarAgencySlice = createApi({
    reducerPath: 'CarAgencyDetailsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getCarAgencyBtId: builder.query({
            query: ({id, lang}) => `cars-by-agency/${id}?lang=${lang}`,
        }),
    }),
});

export const { useGetCarAgencyBtIdQuery } = CarAgencySlice;
