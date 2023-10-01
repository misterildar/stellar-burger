import { api } from '../../utils/api';
import { TorderDetailsSlice } from '../../utils/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getOrder = createAsyncThunk(
  'order/getOrder',
  async function (orderIngredientId: string[], { rejectWithValue }) {
    try {
      const { order } = await api.numberOrders(orderIngredientId);
      return { order };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

export const getOrderImageDetails = createAsyncThunk(
  'order/orderImageDetails',
  async function (orderNumber: string | undefined, { rejectWithValue }) {
    try {
      const { orders } = await api.orderImageDetails(orderNumber);
      return { orders };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: TorderDetailsSlice = {
  orderDetails: {},
  orderImageDetails: [],
  orderDetailsRequest: false,
  orderDetailsFailed: false,
};

const orderDetailsSlice = createSlice({
  name: 'order',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getOrder.pending, (state) => {
        state.orderDetailsRequest = true;
      })

      .addCase(getOrder.rejected, (state, action) => {
        state.orderDetailsRequest = false;
        state.orderDetailsFailed = action.payload;
      })

      .addCase(getOrder.fulfilled, (state, action) => {
        state.orderDetailsRequest = false;
        state.orderDetailsFailed = false;
        state.orderDetails = action.payload;
      })

      .addCase(getOrderImageDetails.pending, (state) => {
        state.orderDetailsRequest = true;
      })

      .addCase(getOrderImageDetails.rejected, (state, action) => {
        state.orderDetailsRequest = false;
        state.orderDetailsFailed = action.payload;
      })

      .addCase(getOrderImageDetails.fulfilled, (state, action) => {
        state.orderDetailsRequest = false;
        state.orderDetailsFailed = false;
        state.orderImageDetails = action.payload.orders;
      });
  },
});

export default orderDetailsSlice.reducer;

export const orderImageDetailsStore = (store: any) =>
  store.orderDetails.orderImageDetails;

export const orderDetailsStore = (store: any) =>
  store.orderDetails.orderDetails;

export const requestStore = (store: any) =>
  store.orderDetails.orderDetailsRequest;
