import { createSlice } from "@reduxjs/toolkit";
//1. khai báo khởi tạo state
const initialState = {
   listBooks: [] // chứa danh sách công việc
}
//2. thiết lập cho reducer và định nghĩa các action
const booksSlice = createSlice({
   name: 'books',
   initialState,
   reducers: {
       addBooks(state, action) {
         state.listBooks.push(action.payload);
     },
   },
   extraReducers: builder => {
         // đây là chỗ để viết các thao tác mở rộng, xử lý các trạng thái của promise
    },
})
export const { addBooks } = booksSlice.actions;
export default booksSlice.reducer;