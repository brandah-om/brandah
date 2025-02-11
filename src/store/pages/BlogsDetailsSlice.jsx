import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BlogsDetailsSlice = createApi({
    reducerPath: 'BlogsDetailsApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL }),
    endpoints: builder => ({
        getBlogsBtId: builder.query({
            // query: id => `blog/${id}`,
            query: (id, lang) => `blog/${id}?lang=${lang}`,
        }),
    }),
});

export const { useGetBlogsBtIdQuery } = BlogsDetailsSlice;
