import { RootState } from '..';
import { api } from '../../utils/api';
import { PayloadAction } from '@reduxjs/toolkit';
import { TorderDetailsSlice } from '../../utils/types';
import { TOrderDetails, TOrder } from '../../utils/types';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getOrder = createAsyncThunk(
  'order/getOrder',
  async function (orderIngredientId: string[], { rejectWithValue }) {
    try {
      const { order }: TOrderDetails = await api.numberOrders(
        orderIngredientId
      );
      return { order };
    } catch (error) {
      return rejectWithValue(error);
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
  orderDetails: null,
  orderImageDetails: null,
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

      .addCase(
        getOrderImageDetails.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.orderDetailsRequest = false;
          state.orderDetailsFailed = false;
          state.orderImageDetails = action.payload;
        }
      );
  },
});

export default orderDetailsSlice.reducer;

export const orderImageDetailsStore = (store: RootState) =>
  store.orderDetails.orderImageDetails;

export const orderDetailsStore = (store: RootState) =>
  store.orderDetails.orderDetails;

export const requestStore = (store: RootState) =>
  store.orderDetails.orderDetailsRequest;
