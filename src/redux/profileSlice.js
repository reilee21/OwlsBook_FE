import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    profile : {
        firstName:'',
        lastName:'',
        phoneNumber:'',
        image:null,
        city:'',
        district:'',
        ward:'',
        address:''
    }, 
};

const profileSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setProfile(state,action){
            state.profile = {
                ...state.profile,
                ...action.payload
            };
        },
        
    },
});
export const {setProfile} = profileSlice.actions;
export default profileSlice.reducer;