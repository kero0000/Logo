import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name:"user",
    initialState: {
        currentUser: null,
        isFetching:false,
        error:false
    },
    reducers: {
        loginStart:(state)=>{
            state.isFetching = true
        },

        loginSuccess:(state, action) =>{
            state.isFetching=false;
            state.currentUser=action.payload
            state.error = false
        },

        loginFailure: (state) => {
            state.error=true
            state.isFetching=false
        },

        updateStart:(state, action) => {
            state.isFetching = true;
        },

        updateSuccess: (state, action) => {
            state.isFetching = false;
            state.currentUser = action.payload
            state.error = false
        },
        updateFailure: (state) => {
            state.isFetching = false;
            state.error = true;
        },
        registerStart:(state)=>{
            state.isFetching = true
            state.error = false
        },

        registerSuccess:(state)=> {
            state.error = false;
            state.isFetching = false;
        },
        registerFailure:(state)=> {
            state.error = true
            state.isFetching = false
        },

        logOut:(state) => {
            state.currentUser= null
            state.isFetching=false
            state.error=false
        }
    }
})

export const {loginFailure, loginStart, loginSuccess, updateFailure, updateStart, updateSuccess, registerFailure, registerStart, registerSuccess, logOut} = userSlice.actions;
export default userSlice.reducer
