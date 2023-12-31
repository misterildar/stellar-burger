import { TFeedNumbers } from '../../utils/types';
import { TwsOrderSlice } from '../../utils/types';
import { WebsocketStatus } from '../../utils/constants';
import { createReducer, createAction } from '@reduxjs/toolkit';

export const connect = createAction<string>('ORDERS_CONNECT');
export const disconnect = createAction('ORDERS_DISCONNECT');
export const wsConnecting = createAction('ORDERS_WS_CONNECTING');
export const wsOpen = createAction('ORDERS_WS_OPEN');
export const wsClose = createAction('ORDERS_WS_CLOSE');
export const wsMessage = createAction<TFeedNumbers>('ORDERS_WS_MESSAGE');
export const wsError = createAction<string>('ORDERS_WS_ERROR');

const initialState: TwsOrderSlice = {
  status: WebsocketStatus.OFFLINE,
  order: null,
  connectingError: '',
};

export const wsOrderSlice = createReducer(initialState, (builder) => {
  builder

    .addCase(wsConnecting, (state) => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
      state.status = WebsocketStatus.ONLINE;
      state.connectingError = '';
    })
    .addCase(wsClose, (state) => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.connectingError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.order = action.payload;
    });
});
