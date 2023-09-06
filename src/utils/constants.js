export const routes = {
  home: '/',
  feed: '/feed',
  login: '/login',
  order: 'order',
  profile: '/profile-nav',
  register: '/register',
  resetPassword: '/reset-password',
  forgotPassword: '/forgot-password',
  ingredients: '/ingredients/:ingredientId',
  orderDetails: '/order/:id'
}

export const WebsocketStatus = {
  CONNECTING: 'CONNECTING...',
  ONLINE: 'ONLINE',
  OFFLINE: 'OFFLINE'
}

export const OrdersActionType = {
  DATA: 'data',
  INSERT: 'insert',
  DELETE: 'delete',
  UPDATE: 'update',
  MOVE: 'move',
}

export const WS_ORDERS_URL = 'wss://norma.nomoreparties.space/orders/all'