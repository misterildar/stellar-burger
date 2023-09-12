import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../utils/api';

export const getOrder = createAsyncThunk(
  'order/getOrder',
  async function (orderIngredientId, { rejectWithValue }) {
    try {
      const { order } = await api.numberOrders(orderIngredientId);
      return { order }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);


export const getOrderImageDetails = createAsyncThunk(
  'order/orderImageDetails',
  async function (orderNumber, { rejectWithValue }) {
    try {
      const { orders } = await api.orderImageDetails(orderNumber);
      return { orders }
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const orderDetailsSlice = createSlice({
  name: 'order',
  initialState: {
    orderDetails: {},
    orderImageDetails: [],
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
    },

    [getOrderImageDetails.pending]: (state) => {
      state.orderDetailsRequest = true;
    },

    [getOrderImageDetails.rejected]: (state, action) => {
      state.orderDetailsRequest = false;
      state.orderDetailsFailed = action.payload
    },

    [getOrderImageDetails.fulfilled]: (state, action) => {
      state.orderDetailsRequest = false;
      state.orderDetailsFailed = false
      state.orderImageDetails = action.payload.orders;
    }
  }
})




export default orderDetailsSlice.reducer

export const orderImageDetailsStore = (store => store.orderDetails.orderImageDetails)

export const orderDetailsStore = (store => store.orderDetails.orderDetails)

export const requestStore = (store => store.orderDetails.orderDetailsRequest)