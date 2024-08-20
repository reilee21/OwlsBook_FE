import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    update: false,
};

const cartSlice = createSlice({
    name: "change",
    initialState,
    reducers: {
        updateCartState(state, action) {
            state.update = !state.update;
        },
    },
});

export const { updateCartState } = cartSlice.actions;
export default cartSlice.reducer;
