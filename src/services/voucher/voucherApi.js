import { baseApi } from '../_baseApi';

const VoucherApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
        getAllVoucher: builder.query({
            query: ({page=1,pageSize=10}) => ({
                url: `/Manage/Voucher/GetAll?page=${page}&pagesize=${pageSize}`,
                method: 'GET',
            }),
        }),
        createVoucher: builder.mutation({
            query: (voucher) => ({
                url: `/Manage/Voucher/Create`,
                method: 'POST',
                body:voucher
            }),
        }),
        editVoucher: builder.mutation({
            query: (voucher) => ({
                url: `/Manage/Voucher/Edit`,
                method: 'PUT',
                body:voucher
            }),
        }),
        deleteVoucher: builder.mutation({
            query: ({id}) => ({
                url: `/Manage/Voucher/Delete?id=${id}`,
                method: 'DELETE',
            }),
        }),
      
    })  
});

export const { useGetAllVoucherQuery,useCreateVoucherMutation,useEditVoucherMutation,useDeleteVoucherMutation } = VoucherApi;
