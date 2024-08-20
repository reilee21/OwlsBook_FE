import { baseApi } from '../_baseApi';

const DeliveryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
        getAllDelivery: builder.query({
            query: ({page=1,pageSize=10,search=''}) => ({
                url: `/Manage/Delivery/GetAll?SearchName=${search}&page=${page}&pagesize=${pageSize}`,
                method: 'GET',
            }),
        }),
        getDeliveryById: builder.query({
            query: ({id=''}) => ({
                url: `/Manage/Delivery/GetByid?id=${id? id : ''}`,
                method: 'GET',
            }),
        }),
        createDelivery: builder.mutation({
            query: (delivery) => ({
                url: `/Manage/Delivery/Create`,
                method: 'POST',
                body:delivery
            }),
        }),
        editDelivery: builder.mutation({
            query: (delivery) => ({
                url: `/Manage/Delivery/Edit`,
                method: 'PUT',
                body:delivery
            }),
        }),
        deleteDelivery: builder.mutation({
            query: ({id=''}) => ({
                url: `/Manage/Delivery/Delete?id=${id}`,
                method: 'DELETE',
            }),
        }),
      
    })  
});

export const { useGetAllDeliveryQuery,useCreateDeliveryMutation,useEditDeliveryMutation,useDeleteDeliveryMutation,useGetDeliveryByIdQuery } = DeliveryApi;
