import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const UserDataSlice = createApi({
    reducerPath: 'UserDataSlice',
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL,
        prepareHeaders: (headers, { getState }) => {
            const token = localStorage.getItem('token');
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        GetuserData: builder.mutation({
            query: (body) => ({
                url: 'user/profile',
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useGetuserDataMutation } = UserDataSlice;
