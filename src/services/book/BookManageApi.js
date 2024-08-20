import { baseApi } from '../_baseApi';

const booksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllBooksManage: builder.query({
      query: ({ page, pageSize,search,cate }) => ({
        url: `Manage/Product/GetAll?Page=${page}&PageSize=${pageSize}&searchName=${search}&category=${cate}`, 
        method: 'GET', 
      }),
    }),
    getBookByIdManage: builder.query({
      query: ({ id }) => ({
        url: `Manage/Product/GetDetails?bookId=${id}`,
        method: 'GET',
      }),
    }),
    createBook:builder.mutation({
      query:(book)=>({
        url:'Manage/Product/Create',     
        method:'POST',
        body:book
      }),
    }),
    editBook:builder.mutation({
      query:(book)=>({
        url:'Manage/Product/update',
        method:'PUT',
        body:book
      }),
    }),
    deleteBook:builder.mutation({
      query:({id})=>({
        url:`Manage/Product/delete?id=${id}`,
        method:'DELETE',
      }),
    }),
  }),
});

export const {useGetAllBooksManageQuery, useGetBookByIdManageQuery,useCreateBookMutation,useEditBookMutation,useDeleteBookMutation  } = booksApi;
