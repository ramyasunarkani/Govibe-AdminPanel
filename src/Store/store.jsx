import { configureStore } from "@reduxjs/toolkit";
import authReducer from  './auth'
import listReducer from './listItems';
import categoryReducer from './categoryItems';
import bookingReducers from './bookingSlice'

const store=configureStore({
    reducer:{
        auth:authReducer,
        listItems:listReducer,
        categories:categoryReducer,
        bookings:bookingReducers,

    }
})

export default store;