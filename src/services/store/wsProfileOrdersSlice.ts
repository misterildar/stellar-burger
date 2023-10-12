import { TFeedNumbers } from '../../utils/types';
import { TwsOrderSlice } from '../../utils/types';
import { WebsocketStatus } from '../../utils/constants';
import { createReducer, createAction } from '@reduxjs/toolkit';

export const connectProfile = createAction<string>('PROFILE_ORDERS_CONNECT');
export const disconnectProfile = createAction('PROFILE_ORDERS_DISCONNECT');
export const wsConnectingProfile = createAction('PROFILE_ORDERS_WS_CONNECTING');
export const wsOpenProfile = createAction('PROFILE_ORDERS_WS_OPEN');
export const wsCloseProfile = createAction('PROFILE_ORDERS_WS_CLOSE');
export const wsMessageProfile = createAction<TFeedNumbers>(
  'PROFILE_ORDERS_WS_MESSAGE'
);
export const wsErrorProfile = createAction<string>('PROFILE_ORDERS_WS_ERROR');

const initialState: TwsOrderSlice = {
  status: WebsocketStatus.OFFLINE,
  order: null,
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
    .addCase(wsMessageProfile, (state, action) => {
      state.order = action.payload;
    });
});
