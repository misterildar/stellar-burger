import userSlice from './store/userSlice';
import { configureStore } from '@reduxjs/toolkit';
import { wsOrderSlice } from './store/wsOrdersSlice';
import { wsProfileOrderSlice } from './store/wsProfileOrdersSlice';
import constructorSlice from './store/constructorSlice';
import ingredientsSlice from './store/ingredientsSlice';
import orderDetailsSlice from './store/orderDetailsSlice';
import { socketMiddleware } from './store/middleware/socket-middleware';
import { connect, disconnect, wsOpen, wsClose, wsMessage, wsError, wsConnecting } from './store/wsOrdersSlice';
import { connectProfile, disconnectProfile, wsConnectingProfile, wsOpenProfile, wsCloseProfile, wsErrorProfile, wsMessageProfile, } from './store/wsProfileOrdersSlice';


const wsOrdersMiddleware = socketMiddleware({
  wsConnect: connect,
  wsDisconnect: disconnect,
  wsConnecting: wsConnecting,
  onOpen: wsOpen,
  onClose: wsClose,
  onError: wsError,
  onMessage: wsMessage,
})

const wsProfileOrdersMiddleware = socketMiddleware({
  wsConnect: connectProfile,
  wsDisconnect: disconnectProfile,
  wsConnecting: wsConnectingProfile,
  onOpen: wsOpenProfile,
  onClose: wsCloseProfile,
  onError: wsErrorProfile,
  onMessage: wsMessageProfile,
})

export default configureStore({
  reducer: {
    burgerConstructor: constructorSlice,
    burgerIngredients: ingredientsSlice,
    orderDetails: orderDetailsSlice,
    user: userSlice,
    wsOrder: wsOrderSlice,
    wsProfileOrder: wsProfileOrderSlice
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(wsOrdersMiddleware, wsProfileOrdersMiddleware);
  }
})


