import { baseApi } from '../_baseApi';

const DiscountApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
        getAllDiscount: builder.query({
            query: ({page=1,pageSize=10}) => ({
                url: `/Manage/Discount/GetAll?page=${page}&pagesize=${pageSize}`,
                method: 'GET',
            }),
        }),
        getDiscountByName: builder.query({
            query: ({search}) => ({
                url: `/Manage/Discount/GetByName?name=${search}`,
                method: 'GET',
            }),
        }),
        createDiscount: builder.mutation({
            query: (Discount) => ({
                url: `/Manage/Discount/Create`,
                method: 'POST',
                body:Discount
            }),
        }),
        editDiscount: builder.mutation({
            query: (Discount) => ({
                url: `/Manage/Discount/Edit`,
                method: 'PUT',
                body:Discount
            }),
        }),
        deleteDiscount: builder.mutation({
            query: ({id}) => ({
                url: `/Manage/Discount/Delete?id=${id}`,
                method: 'DELETE',
            }),
        }),
        applyDiscountOldBook: builder.mutation({
            query: (discount) => ({
                url: `/Manage/Discount/ApplyOldBook`,
                method: 'POST',
                body:discount
            }),
        }),
      
    })  
});

export const { useApplyDiscountOldBookMutation,useGetAllDiscountQuery,useGetDiscountByNameQuery,useCreateDiscountMutation,useEditDiscountMutation,useDeleteDiscountMutation } = DiscountApi;
