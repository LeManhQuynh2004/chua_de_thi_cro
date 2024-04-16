import { createSlice } from "@reduxjs/toolkit";
import { addCartAPI, updateCartApi } from "../actions/CartAction";
//1. khai báo khởi tạo state
const initialState = {
  listCarts: []
}
//2. thiết lập cho reducer và định nghĩa các action
const CartsSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addCart(state, action) {
      state.listCarts.push(action.payload);
    },
  },
  extraReducers: builder => {
    builder.addCase(addCartAPI.fulfilled, (state, action) => {
      state.listCarts.push(action.payload);
    })
      .addCase(addCartAPI.rejected, (state, action) => {
        // Xử lý khi yêu cầu thêm todo bị từ chối hoặc xảy ra lỗi
        console.log('Add todo rejected:', action.error.message);
      });
    builder.addCase(updateCartApi.fulfilled, (state, action) => {
      // lấy tham số truyền vào
      // console.log(action);
      const { id, quantity } = action.payload;
      // tìm bản ghi phù hợp với tham số truyền vào
      const cart = state.listCarts.find(row => row.id === id);
      // update
      if (cart) {
        cart.quantity = quantity
      }
    })
      .addCase(updateCartApi.rejected, (state, action) => {
        // Xử lý khi yêu cầu Sửa todo bị từ chối hoặc xảy ra lỗi
        console.log('Update todo rejected:', action.error.message);
      });
  },
})
export const { addCart } = CartsSlice.actions;
export default CartsSlice.reducer;