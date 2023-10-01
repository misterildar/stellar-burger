import { ReactNode } from 'react';

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
  filter?: any;
  map?: any;
  toReversed?: any;
};

export type TFeedNumbers = {
  success: boolean | string;
  orders: TCardOrder | null;
  total: number;
  totalToday: number;
  status?: string;
  connectingError?: string;
  length?: any;
};

export type TconstructorSlice = {
  ingredientBurger: TIngredient[];
  bun: TIngredient | null;
};

export type TingredientsSlice = {
  ingredients: TIngredient[];
  loading: boolean | null;
  error: any;
};

export type TOrder = {
  orders: TCardOrder;
};

export type TorderDetailsSlice = {
  orderDetails: TOrder | {};
  orderImageDetails: TOrder | [];
  orderDetailsRequest: boolean | string;
  orderDetailsFailed: boolean | string | unknown;
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
  onClose: () => void;
};

export type TUser = {
  name?: string;
  email?: string;
  password?: string;
  code?: string;
};
