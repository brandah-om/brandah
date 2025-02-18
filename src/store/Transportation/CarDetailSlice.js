import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const CarDetailSlice = createApi({
    reducerPath: 'CarDetailsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getCarsById: builder.query({
            query: ({carId, lang}) => `car/${carId}?lang=${lang}`,
        }),
    }),
});

export const { useGetCarsByIdQuery } = CarDetailSlice;
