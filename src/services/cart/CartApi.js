import { baseApi } from './../_baseApi';

const cartApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
        getCart: builder.query({
            query: () => ({
                url: `Cart/GetCart`, 
                method: 'GET', 
            }),
        }),   
        updateQuantity: builder.mutation({
            query: ({ id, quantity }) => ({
            url: `Cart/UpdateCart`,
            method: 'PUT',
            body: { id, quantity },
            }),
        }),
        addToCart: builder.mutation({
            query: ({ bookId, quantity }) => ({
            url: `Cart/AddToCart`,
            method: 'POST',
            body: { bookId, quantity },
            }),
        }),
        removeCartItem: builder.mutation({
            query: ({id}) => ({
            url: `Cart/RemoveItem`,
            method: 'DELETE',
            body: {id },
            }),
        }),
    }),
});

export const { useGetCartQuery,useUpdateQuantityMutation,useAddToCartMutation,useRemoveCartItemMutation} = cartApi;
