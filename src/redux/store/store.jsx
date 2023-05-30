import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../slices/userSlice";
import {userApi} from "../apis/userApi"

const store = configureStore({
    reducer: {
        user: userSlice,
        [userApi.reducerPath]: userApi.reducer,
    },
    
    middleware: (gdM)=> gdM().concat(userApi.middleware)
});

export default store;