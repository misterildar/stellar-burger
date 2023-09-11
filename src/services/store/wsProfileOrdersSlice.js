import { createAction } from '@reduxjs/toolkit';
import { createReducer } from '@reduxjs/toolkit';
import { WebsocketStatus } from '../../utils/constants';




export const connectProfile = createAction('PROFILE_ORDERS_CONNECT') // подключение
export const disconnectProfile = createAction('PROFILE_ORDERS_DISCONNECT');
export const wsConnectingProfile = createAction('PROFILE_ORDERS_WS_CONNECTING');  // начало процесса соединеия
export const wsOpenProfile = createAction('PROFILE_ORDERS_WS_OPEN'); // соедине установлено
export const wsCloseProfile = createAction('PROFILE_ORDERS_WS_CLOSE');
export const wsMessageProfile = createAction('PROFILE_ORDERS_WS_MESSAGE'); // пришло сообщение от сервера
export const wsErrorProfile = createAction('PROFILE_ORDERS_WS_ERROR');


const initialState = {
  status: WebsocketStatus.OFFLINE,
  orders: [],
  connectingError: ''
}

export const wsProfileOrderSlice = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnectingProfile, state => {
      state.status = WebsocketStatus.CONNECTING;
    })
    .addCase(wsOpenProfile, state => {
      state.status = WebsocketStatus.ONLINE;
      state.connectingError = '';
    })
    .addCase(wsCloseProfile, state => {
      state.status = WebsocketStatus.OFFLINE;
    })
    .addCase(wsErrorProfile, (state, action) => {
      state.connectingError = action.payload;
    })
    .addCase(wsMessageProfile, (state, action) => {
      if (action.payload.success && action.payload.orders.length > 0) {
        state.orders = action.payload;
      }
    })
})


