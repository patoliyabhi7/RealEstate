import {configureStore} from '@reduxjs/toolkit';
import userReducer from './user/userSlice';

export const store = configureStore({
    reducer: {},
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false
        }),    
});