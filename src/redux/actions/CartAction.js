
import { createAsyncThunk } from '@reduxjs/toolkit';
import { addCart } from '../reducesr/CartReducers';
const api_url = 'http://10.0.2.2:3000/Carts';
export const fetchCarts = () => {
    return async dispatch => {
        try {
            const response = await fetch(api_url);
            const data = await response.json();
            console.log(data);
            data.forEach(row => {
                dispatch(addCart(row));
            });
        } catch (error) {
            console.error('Error fetching:', error);
        }
    };
};

export const addCartAPI = createAsyncThunk(
    'cart/addCartAPI',
    async (objTodo, thunkAPI) => {
        console.log(objTodo);
        try {
            // Gửi yêu cầu DELETE đến API để xóa todo
            const response = await fetch(api_url, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objTodo)
            });
            const data = await response.json();
            // console.log(response);
            // Kiểm tra nếu status code là 200 hoặc 204 thì xóa thành công
            if (response.ok) {
                // console.log(response);
                // Sau khi xóa thành công, trả về id của todo đã xóa để cập nhật store
                return data;
            } else {
                // Nếu có lỗi từ phía server, trả về lỗi
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (error) {
            // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);

export const updateCartApi = createAsyncThunk(
    'cart/updateCartApi',
    async (objUpdate, thunkAPI) => {
        // console.log('objupdate: '+ JSON.stringify(objUpdate));
        try {
            // Gửi yêu cầu DELETE đến API để xóa todo

            const response = await fetch(`${api_url}/${objUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(objUpdate.data)
            });

            const data = await response.json();
            // console.log(response);
            // Kiểm tra nếu status code là 200 hoặc 204 thì xóa thành công
            if (response.ok) {
                // console.log(response);
                // Sau khi xóa thành công, trả về id của todo đã xóa để cập nhật store
                return data;
            } else {
                // Nếu có lỗi từ phía server, trả về lỗi
                const errorData = await response.json();
                return thunkAPI.rejectWithValue(errorData);
            }
        } catch (error) {
            // Xử lý lỗi nếu có bất kỳ lỗi nào xảy ra
            return thunkAPI.rejectWithValue(error.message);
        }
    }
);