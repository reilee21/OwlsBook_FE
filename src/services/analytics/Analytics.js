import { baseApi } from '../_baseApi';

const analyticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getRevenueByDay: builder.query({
      query: ({ from,to }) => ({
        url: `Manage/Analytics/GetRevenueByDay?from${from}&to=${to}`, 
        method: 'GET', 
      }),
    }),
    getRevenueLast7Days: builder.query({
      query: () => ({
        url: `Manage/Analytics/GetRevenueLast7Days`,
        method: 'GET',
      }),
    }),
    getRevenueLast4Weeks: builder.query({
      query: () => ({
        url: `Manage/Analytics/GetRevenueLast4Weeks`,
        method: 'GET',
      }),
    }),
    getRevenueByMonth: builder.query({
      query: () => ({
        url: `Manage/Analytics/GetRevenueByMonth`,
        method: 'GET',
      }),
    }),
    getTopCustomer: builder.query({
      query: ({take}) => ({
        url: `Manage/Analytics/TopCustomer?${take ? take : 10}`,
        method: 'GET',
      }),
    }),
    getOldBook: builder.query({
      query: ({take}) => ({
        url: `Manage/Analytics/OldBook?${take ? take : 10}`,
        method: 'GET',
      }),
    }),
    getTopView: builder.query({
      query: ({take}) => ({
        url: `Manage/Analytics/TopView?${take ? take : 10}`,
        method: 'GET',
      }),
    }),
    getKeyMetrics: builder.query({
      query: () => ({
        url: `Manage/Analytics/GetKeyMetrics`,
        method: 'GET',
      }),
    }),
    getTopSellBook: builder.query({
      query: () => ({
        url: `Manage/Analytics/GetTopSellBook`,
        method: 'GET',
      }),
    }),
    getLowStockBook: builder.query({
      query: () => ({
        url: `Manage/Analytics/LowStock`,
        method: 'GET',
      }),
    }),
    getSalesByCate: builder.query({
      query: () => ({
        url: `Manage/Analytics/GetSalesByCate`,
        method: 'GET',
      }),
    }),


  }),
});

export const 
{
 useGetSalesByCateQuery,useGetLowStockBookQuery, useGetTopSellBookQuery,useGetKeyMetricsQuery,useGetOldBookQuery,useGetRevenueByDayQuery,useGetRevenueByMonthQuery,useGetRevenueLast4WeeksQuery,useGetRevenueLast7DaysQuery,useGetTopCustomerQuery,useGetTopViewQuery
}
= analyticsApi;
