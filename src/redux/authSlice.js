import { createSlice } from "@reduxjs/toolkit";




const initialState ={
    user:null,
    atk:null,
    rtk:null,
    role:'',
};

const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken(state,action){
            state.user = action.payload.user,
            state.atk = action.payload.accessToken;
            state.rtk = action.payload.refreshToken;
            state.role = action.payload.role;
            localStorage.setItem('accessToken', action.payload.accessToken);
            localStorage.setItem('refreshToken', action.payload.refreshToken);
        },
        clearTokens: (state) => {
            state.user = {};
            state.accessToken = null;
            state.refreshToken = null;
            state.role = "";

            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
    },
});
export const {setToken,clearTokens} = authSlice.actions;
export default authSlice.reducer;