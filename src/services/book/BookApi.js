import { baseApi } from './../_baseApi';

const booksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBookRecommend: builder.query({
      query: ({ quantity }) => ({
        url: `Recommend/GetBookRecommend?quantity=${quantity}`, 
        method: 'GET', 
      }),
    }),
    getBookDiscount: builder.query({
      query: ({ quantity }) => ({
        url: `Books/GetBookDiscount?quantity=${quantity}`,
        method: 'GET',
      }),
    }),
    getBestSeller: builder.query({
      query: ({ quantity }) => ({
        url: `Books/GetBestSell?quantity=${quantity}`,
        method: 'GET',
      }),
    }),
    getBookDetails: builder.query({
      query: ({name }) => ({
        url: `Books/Details?name=${name}`,
        method: 'GET',
      }),
    }),
    searchByName:builder.query({
      query:({searchString,page,pageSize,min,max,sort})=>({
        url:`Books/SearchByName?searchString=${searchString}&Page=${page}&PageSize=${pageSize}&MinPrice=${min}&MaxPrice=${max}&Sort=${sort}`,
        method: 'GET'
      })
    }),
    searchBookByCate:builder.query({
      query:({nameCate,page,pageSize,min,max,sort})=>({
        url:`Books/GetBookByCate?nameCate=${nameCate}&Page=${page}&PageSize=${pageSize}&MinPrice=${min}&MaxPrice=${max}&Sort=${sort}`,
        method: 'GET'
      })
    })
  }),
});

export const { useGetBookRecommendQuery,useGetBestSellerQuery, useGetBookDiscountQuery, useGetBookDetailsQuery,useSearchByNameQuery,useSearchBookByCateQuery } = booksApi;
