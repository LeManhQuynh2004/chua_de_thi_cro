import { configureStore } from "@reduxjs/toolkit";
import BookReducers from "../reducesr/BookReducers";
import CartReducers from "../reducesr/CartReducers";
export default configureStore({
   reducer: {
       listBooks: BookReducers,
       listCarts  : CartReducers
   }
});