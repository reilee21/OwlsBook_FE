import { baseApi } from '../_baseApi';

const OrderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
        getOrdersByUser: builder.query({
            query: ({ page, pageSize}) => ({
                url: `/Customer/GetOrders?page=${page}&pageSize=${pageSize}`,
                method: 'GET',
            }),
        }),
        getOrderDetails: builder.query({
            query: ({orderId}) => ({
                url: `/Customer/GetOrderDetails?orderId=${orderId}`,
                method: 'GET',
            }),
        }),
        cancelOrder: builder.mutation({
            query: (order) => ({
                url: `/Customer/CancelOrder`,
                method: 'POST',
                body:order
            }),
        }),
        getOrdersManage: builder.query({
            query: ({ page, pageSize,search,from,to,status}) => ({
                url: `/Manage/Order/GetAll?page=${page}&pageSize=${pageSize}&search=${search}&from=${from}&to=${to}&status=${status}`,
                method: 'GET',
            }),
        }),
        getOrdersByIdManage: builder.query({
            query: ({id}) => ({
                url: `/Manage/Order/GetById?id=${id}`,
                method: 'GET',
            }),
        }), 
        updateOrdersManage: builder.mutation({
            query: (order) => ({
                url: `/Manage/Order/Update`,
                method: 'PUT',
                body:order,
            }),
        }),
    })  
});

export const { useCancelOrderMutation,useGetOrdersByUserQuery,useGetOrderDetailsQuery,useGetOrdersByIdManageQuery,useGetOrdersManageQuery,useUpdateOrdersManageMutation } = OrderApi;
