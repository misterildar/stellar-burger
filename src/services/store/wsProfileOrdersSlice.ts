import { createAction } from '@reduxjs/toolkit';
import { createReducer } from '@reduxjs/toolkit';
import { WebsocketStatus } from '../../utils/constants';
import { TwsOrderSlice } from '../../utils/types';

export const connectProfile = createAction<string>('PROFILE_ORDERS_CONNECT');
export const disconnectProfile = createAction<string>(
  'PROFILE_ORDERS_DISCONNECT'
);
export const wsConnectingProfile = createAction<string>(
  'PROFILE_ORDERS_WS_CONNECTING'
);
export const wsOpenProfile = createAction<string>('PROFILE_ORDERS_WS_OPEN');
export const wsCloseProfile = createAction<string>('PROFILE_ORDERS_WS_CLOSE');
export const wsMessageProfile = createAction<string>(
  'PROFILE_ORDERS_WS_MESSAGE'
);
export const wsErrorProfile = createAction<string>('PROFILE_ORDERS_WS_ERROR');

const initialState: TwsOrderSlice = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectingError: '',
};

export const wsProfileOrderSlice = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnectingProfile, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpenProfile, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.connectingError = '';
    })
    .addCase(wsCloseProfile, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsErrorProfile, (state, action) => {
      state.connectingError = action.payload;
    })
    .addCase(wsMessageProfile, (state, action: any) => {
      if (action.payload.success && action.payload.orders.length > 0) {
        state.orders = action.payload;
      }
    });
});
