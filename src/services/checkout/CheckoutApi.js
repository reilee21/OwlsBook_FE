import { baseApi } from './../_baseApi';

const checkOutApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
        checkout: builder.query({
            query: () => ({
                url: `Cart/Checkout`, 
                method: 'GET', 
            }),
        }),   
        applyVoucher: builder.mutation({
            query: ({ code }) => ({
                url: `Voucher/CheckVoucher`,
                method: 'POST',
                body: { code },
            }),
        }),
        getShippingFee: builder.mutation({
            query: ({ city,district }) => ({
                url: `Delivery/GetDelivery`,
                method: 'POST',
                body: { city,district  },
            }),
        }),
        placeOrder: builder.mutation({
            
            query: (order) => ({
                url: `CheckOut/Process`,
                method: 'POST',
                body: order,
            }),
        }),
        callBackPayment: builder.mutation({
            query:({transId})=>({
                url:`CheckOut/HandlePaymentCallback`,
                method:'PUT',
                body:{transId}
            })
        })
    }),
});

export const { useCheckoutQuery,useApplyVoucherMutation,useGetShippingFeeMutation,usePlaceOrderMutation,useCallBackPaymentMutation} = checkOutApi;
