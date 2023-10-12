import { TUser } from './types';
import {
  setAuthChecked,
  setUser,
  ubdateTokenUser,
  getUser,
} from '../services/store/userSlice';
import { AppDispatch } from './types';

const baseUrl: string = 'https://norma.nomoreparties.space/api/';

const checkErrorPromise = (res: Response) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};

const getInitialIngredients = () => {
  return fetch(`${baseUrl}ingredients`).then(checkErrorPromise);
};

const numberOrders = (arrayIdOrder: string[]) => {
  return fetch(`${baseUrl}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken'),
    } as HeadersInit,
    body: JSON.stringify({
      ingredients: arrayIdOrder,
    }),
  }).then(checkErrorPromise);
};

const orderImageDetails = (orderNumber: string | undefined) => {
  return fetch(`${baseUrl}orders/${orderNumber}`).then(checkErrorPromise);
};

const getLogOut = () => {
  return fetch(`${baseUrl}auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then(checkErrorPromise);
};

const getRegister = (url: string, bodyData: TUser) => {
  return fetch(`${baseUrl}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken'),
    } as HeadersInit,
    body: JSON.stringify(bodyData),
  }).then(checkErrorPromise);
};

const getLogin = (url: string, bodyData: TUser) => {
  return fetch(`${baseUrl}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken'),
    } as HeadersInit,
    body: JSON.stringify(bodyData),
  }).then(checkErrorPromise);
};

const checkUserAuth = () => {
  return (dispatch: AppDispatch) => {
    if (localStorage.getItem('accessToken')) {
      dispatch(getUser());
      dispatch(ubdateTokenUser())
        .catch(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
          dispatch(setUser(null));
        })
        .finally(() => dispatch(setAuthChecked(true)));
    } else {
      dispatch(setAuthChecked(true));
    }
  };
};

const refreshToken = () => {
  return fetch(`${baseUrl}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken'),
    }),
  }).then(checkErrorPromise);
};

const fetchWithRefresh = async (url: string, options: RequestInit) => {
  try {
    const res = await fetch(url, options);
    return await checkErrorPromise(res);
  } catch (err) {
    if ((err as Error).message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      localStorage.setItem('accessToken', refreshData.accessToken);
      const res = await fetch(url, options);
      return await checkErrorPromise(res);
    } else {
      return Promise.reject(err);
    }
  }
};

const getUpdateToken = () => {
  return fetch(`${baseUrl}auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken'),
    } as HeadersInit,
  }).then(checkErrorPromise);
};

const getForgotPassword = (mail: string) => {
  return fetch(`${baseUrl}password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      email: mail,
    }),
  }).then(checkErrorPromise);
};

const getReserPassword = (form: TUser) => {
  return fetch(`${baseUrl}password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken'),
    } as HeadersInit,
    body: JSON.stringify({
      password: form.password,
      token: form.code,
    }),
  }).then(checkErrorPromise);
};

const getUserData = () => {
  return fetchWithRefresh(`${baseUrl}auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken'),
    } as HeadersInit,
  }).then((res) => {
    return res.success ? res.user : '';
  });
};

const getUpdateUserData = (bodyData: TUser) => {
  return fetchWithRefresh(`${baseUrl}auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken'),
    } as HeadersInit,
    body: JSON.stringify(bodyData),
  }).then((res) => {
    return res.success ? res.user : '';
  });
};

export const api = {
  getInitialIngredients,
  getForgotPassword,
  orderImageDetails,
  getUpdateUserData,
  getReserPassword,
  getUpdateToken,
  checkUserAuth,
  numberOrders,
  getUserData,
  getRegister,
  getLogOut,
  getLogin,
};
