export const routes = {
  home: '/',
  feed: '/feed',
  order: 'order',
  login: '/login',
  register: '/register',
  profile: '/profile-nav',
  orderDetails: '/feed/:id',
  resetPassword: '/reset-password',
  forgotPassword: '/forgot-password',
  ingredients: '/ingredients/:ingredientId',
  profileOrderDetails: '/profile-nav/order/:id'
}

export const WebsocketStatus = {
  CONNECTING: 'CONNECTING...',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE'
}

export const OrdersActionType = {
  MOVE: 'move',
  DATA: 'data',
  INSERT: 'insert',
  DELETE: 'delete',
  UPDATE: 'update',
}

export const WS_ORDERS_URL = 'wss://norma.nomoreparties.space/orders/all'

export const WS_ORDERS_PROFILE_URL = 'wss://norma.nomoreparties.space/orders'