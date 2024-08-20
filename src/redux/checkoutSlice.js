import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    voucher : {},
};

const checkoutSlice = createSlice({
    name:"checkout",
    initialState,
    reducers:{
        setApplyVoucher(state,action){
            state.voucher = action.payload
        },
    },
});
export const {setApplyVoucher} = checkoutSlice.actions;
export default checkoutSlice.reducer;