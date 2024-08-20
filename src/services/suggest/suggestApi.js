import { baseApi } from '../_baseApi';

const suggestApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookCrawl: builder.query({
      query: ({ page,pageSize}) => ({
        url: `Manage/BookCrawler/GetBookCrawl?page=${page}&pageSize=${pageSize}`, 
        method: 'GET', 
      }),
    }),
    refreshBookCrawl: builder.mutation({
      query: () => ({
        url: `Manage/BookCrawler/ReCrawl`, 
        method: 'POST', 
      }),
    }),

  }),
});

export const 
{
  useGetBookCrawlQuery,useRefreshBookCrawlMutation
}
= suggestApi;
