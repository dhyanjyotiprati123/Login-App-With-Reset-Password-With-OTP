import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isLoggedin: false
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        userLoggedIn: (state,action)=>{
            state.user = action.payload;
            state.isLoggedin = true
        },

        userLoggedOut: (state)=>{
            state.user=null;
            state.isLoggedin=false
        }
    }
});

export const {userLoggedIn, userLoggedOut} = userSlice.actions;

export default userSlice.reducer