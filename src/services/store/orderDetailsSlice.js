import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { numberOrders } from '../../utils/ingredient-api';

export const getOrder = createAsyncThunk(
  'order/getOrder',
  async function (orderIngredientId, { rejectWithValue }) {
    try {
      const { order } = await numberOrders(orderIngredientId);
      return { order }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


const orderDetailsSlice = createSlice({
  name: 'order',
  initialState: {
    orderDetails: {},
    orderDetailsRequest: false,
    orderDetailsFailed: false,
  },
  extraReducers: {
    [getOrder.pending]: (state) => {
      state.orderDetailsRequest = true;
    },

    [getOrder.rejected]: (state, action) => {
      state.orderDetailsRequest = false;
      state.orderDetailsFailed = action.payload
    },

    [getOrder.fulfilled]: (state, action) => {
      state.orderDetailsRequest = false;
      state.orderDetailsFailed = false
      state.orderDetails = action.payload;

    }
  }
})




export default orderDetailsSlice.reducer

export const orderDetailsStore = (store => store.orderDetails.orderDetails)

export const requestStore = (store => store.orderDetails.orderDetailsRequest)