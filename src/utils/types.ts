import { ReactNode } from 'react';
import {
  ActionCreatorWithPayload,
  ActionCreatorWithoutPayload,
} from '@reduxjs/toolkit';
import { store } from '../services';

export type AppDispatch = typeof store.dispatch;

export type TIngredient = {
  _id: string;
  name: string;
  type: 'bun' | 'main' | 'sauce';
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_mobile: string;
  image_large: string;
  __v: number;
  nanoidId?: string;
  key?: string;
};

export type TAppHeaderItem = {
  title: string;
  children: ReactNode;
  link: string;
};

export type TCardOrder = {
  _id: string;
  ingredients: string[];
  status: 'created' | 'done' | 'pending';
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  owner?: string;
  __v?: number;
};

export type TFeedNumbers = {
  success: boolean | string;
  orders: TCardOrder[];
  total: number;
  totalToday: number;
  status?: string;
  connectingError?: string;
};

export type TconstructorSlice = {
  ingredientBurger: TIngredient[];
  bun: TIngredient | null;
};

export type TingredientsSlice = {
  ingredients: TIngredient[];
  loading: boolean | null;
  error: null | unknown;
};

export type TOrder = {
  orders: TCardOrder | undefined;
};

export type TOrderDetails = {
  order: TDetails;
};

export type TorderDetailsSlice = {
  orderDetails: TOrderDetails | null;
  orderImageDetails: TOrder | null;
  orderDetailsRequest: boolean | string;
  orderDetailsFailed: boolean | unknown;
};

export type TuserSlice = {
  user: boolean | null;
  email: string | null;
  name: string | null;
  password: string;

  accessToken: string | null;
  refreshToken: string | null;

  isRequest: boolean | string;
  isFailed: boolean | string | unknown;

  isAuthChecked: boolean | string;
  isForgotPasswordRequest: boolean;
};

export type TwsOrderSlice = {
  status: string;
  order: TFeedNumbers | null;
  connectingError: string;
};

export type TCreateOrder = {
  totalPrice: number;
  orderIngredientId: string[];
};

export type TonClose = {
  onClose?: () => void;
};

export type TUser = {
  name?: string | null;
  email?: string | null;
  password?: string;
  code?: string;
};

export type TDetails = {
  createdAt: string;
  ingredients: TIngredient;
  name: string;
  owner: {
    name: string;
    createdAt: string;
    updatedAt: string;
    email: string;
  };
  number: number;
  price: number;
  status: 'created' | 'done' | 'pending';
  updatedAt: string;
  _id: string;
};

export type TsocketMiddleware = {
  wsConnect: ActionCreatorWithPayload<string>;
  onOpen: ActionCreatorWithoutPayload;
  onClose: ActionCreatorWithoutPayload;
  onError: ActionCreatorWithPayload<string>;
  onMessage: ActionCreatorWithPayload<TFeedNumbers>;
  wsConnecting: ActionCreatorWithoutPayload;
  wsDisconnect: ActionCreatorWithoutPayload;
};
