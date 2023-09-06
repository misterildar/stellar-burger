import { createAction } from '@reduxjs/toolkit';
import { createReducer } from '@reduxjs/toolkit';
import { WebsocketStatus } from '../../utils/constants';




export const connect = createAction('ORDERS_CONNECT') // подключение
export const disconnect = createAction('ORDERS_DISCONNECT');
export const wsConnecting = createAction('ORDERS_WS_CONNECTING');  // начало процесса соединеия
export const wsOpen = createAction('ORDERS_WS_OPEN'); // соедине установлено
export const wsClose = createAction('ORDERS_WS_CLOSE');
export const wsMessage = createAction('ORDERS_WS_MESSAGE'); // пришло сообщение от сервера
export const wsError = createAction('ORDERS_WS_ERROR');


const initialState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectingError: ''
}

export const wsOrderSlice = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, state => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpen, state => {
      state.status = WebsocketStatus.ONLINE;
      state.connectingError = '';
    })
    .addCase(wsClose, state => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsError, (state, action) => {
      state.connectingError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      state.orders = action.payload;
    })
})


