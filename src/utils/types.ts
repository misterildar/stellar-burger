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
  readonly title: string;
  readonly children: ReactNode;
  readonly link: string;
};

export type TCardOrder = {
  _id: string;
  ingredients: string[];
  status: 'created' | 'done' | 'pending';
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  filter: any;
};

export type TFeedNumbers = {
  success: boolean;
  orders: TCardOrder;
  total: number;
  totalToday: number;
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

export type TorderDetailsSlice = {
  //TODO change
  orderDetails: {};
  orderImageDetails: [];
  orderDetailsRequest: any;
  orderDetailsFailed: any;
};

//TODO change
export type TuserSlice = {
  user: any;
  email: any;
  name: any;
  password: any;

  accessToken: any;
  refreshToken: any;

  isRequest: any;
  isFailed: any;

  isAuthChecked: any;
  isForgotPasswordRequest: boolean;
};

export type TwsOrderSlice = {
  status: string;
  orders: any;
  connectingError: string | undefined;
};

//TODO
// export type TwsActions = {
//   wsConnect: string;
//   wsSendMessage: string;
//   onOpen: string;
//   onClose: string;
//   onError: string;
//   onMessage: string;
//   wsConnecting: string;
//   wsDisconnect: string;
// };

export type TCreateOrder = {
  readonly totalPrice: number;
  readonly orderIngredientId: string[];
};

export type TonClose = {
  onClose: () => void;
};
