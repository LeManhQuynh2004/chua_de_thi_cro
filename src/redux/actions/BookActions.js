import { createAsyncThunk } from '@reduxjs/toolkit';
import { addBooks } from '../reducesr/BookReducers';
const api_url = 'http://10.0.2.2:3000/Books';
export const fetchTodos = () => {
 return async dispatch => {
   try {
     const response = await fetch(api_url);
     const data = await response.json();
     data.forEach(row => {
       dispatch(addBooks( row));
     });
   } catch (error) {
     console.error('Error fetching:', error);
   }
 };
};