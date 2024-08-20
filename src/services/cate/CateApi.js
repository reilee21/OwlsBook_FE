import { baseApi } from './../_baseApi';

const catesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCates: builder.query({
      query: () => ({
        url: `Category/GetAllCategory`, 
        method: 'GET', 
      }),
    }),   
  getAllCategory: builder.query({
      query: ({page=1,pageSize=10,search=''}) => ({
          url: `/Manage/Category/GetAll?searchname=${search}&page=${page}&pagesize=${pageSize}`,
          method: 'GET',
      }),
  }),
  createCategory: builder.mutation({
      query: (Category) => ({
          url: `/Manage/Category/Create`,
          method: 'POST',
          body:Category
      }),
  }),
  editCategory: builder.mutation({
      query: (Category) => ({
          url: `/Manage/Category/Edit`,
          method: 'PUT',
          body:Category
      }),
  }),
  deleteCategory: builder.mutation({
      query: ({id}) => ({
          url: `/Manage/Category/Delete?id=${id}`,
          method: 'DELETE',
      }),
  }),
  }),
});

export const { useGetAllCatesQuery,useGetAllCategoryQuery,useCreateCategoryMutation,useEditCategoryMutation,useDeleteCategoryMutation } = catesApi;
