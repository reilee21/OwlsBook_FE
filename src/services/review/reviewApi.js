import { baseApi } from '../_baseApi';

const ReviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
        uploadReview: builder.mutation({
            query: (reviews) => ({
                url: `/Customer/UploadReview`,
                method: 'POST',
                body: reviews
            }),
        }),
        getAllReview: builder.query({
            query: ({page=1,pageSize=10,search=''}) => ({
                url: `/Manage/Review/GetAll?searchname=${search}&page=${page}&pagesize=${pageSize}`,
                method: 'GET',
            }),
        }),
        editReview: builder.mutation({
            query: (review) => ({
                url: `/Manage/Review/Update`,
                method: 'PUT',
                body:review
            }),
        }),
        deleteReview: builder.mutation({
            query: ({id}) => ({
                url: `/Manage/Review/Delete?id=${id}`,
                method: 'DELETE',
            }),
        }),
    })  
});

export const { useUploadReviewMutation,useGetAllReviewQuery, useEditReviewMutation,useDeleteReviewMutation } = ReviewApi;
