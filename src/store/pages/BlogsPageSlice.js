import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BlogsPageSlice = createApi({
    reducerPath: 'BlogsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: (builder) => ({
        getBlogs: builder.query({
            query: () => 'blogs',
        }),
    }),
});

export const { useGetBlogsQuery } = BlogsPageSlice;
