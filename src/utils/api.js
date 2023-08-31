import { setAuthChecked, setUser } from '../services/store/userSlice';
import { ubdateTokenUser } from '../services/store/userSlice';

const baseUrl = 'https://norma.nomoreparties.space/api/';

const checkErrorPromise = (res) => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err));
};


const getInitialIngredients = () => {
  return fetch(`${baseUrl}ingredients`).then(checkErrorPromise);
};

const numberOrders = (arrayIdOrder) => {
  return fetch(`${baseUrl}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify({
      'ingredients': arrayIdOrder,
    })
  })
    .then(checkErrorPromise)
}


const getLogOut = (refreshToken) => {
  return fetch(`${baseUrl}auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      'token': refreshToken
    })
  })
    .then(checkErrorPromise)
}

const getRegister = (url, bodyData) => {
  return fetch(`${baseUrl}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify(
      bodyData
    )
  })
    .then(checkErrorPromise)
}

const getLogin = (url, bodyData) => {
  return fetch(`${baseUrl}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify(
      bodyData
    )
  })
    .then(checkErrorPromise)
}




const checkUserAuth = () => {
  return (dispatch) => {
    if (localStorage.getItem("accessToken")) {
      dispatch(ubdateTokenUser())
        .catch(() => {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
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
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      token: localStorage.getItem("refreshToken"),
    }),
  }).then(checkErrorPromise);
};

const fetchWithRefresh = async (url, options) => {
  try {
    const res = await fetch(url, options);
    return await checkErrorPromise(res);
  } catch (err) {
    if (err.message === "jwt expired") {
      const refreshData = await refreshToken();
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem("refreshToken", refreshData.refreshToken);
      localStorage.setItem("accessToken", refreshData.accessToken);
      const res = await fetch(url, options);
      return await checkErrorPromise(res);
    } else {
      return Promise.reject(err);
    }
  }
};


const getUpdateToken = () => {
  return fetchWithRefresh(`${baseUrl}auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken')
    },
  })
    .then(checkErrorPromise)
}

const getForgotPassword = (mail) => {
  return fetch(`${baseUrl}password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
    },
    body: JSON.stringify({
      email: mail,
    })
  })
    .then(checkErrorPromise)
}


const getReserPassword = (form) => {
  return fetchWithRefresh(`${baseUrl}password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify({
      password: form.password,
      token: form.code
    })
  })
    .then(checkErrorPromise)
}

const getUserData = () => {
  return fetchWithRefresh(`${baseUrl}auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken')
    },
  })
    .then(checkErrorPromise)
}


const getUpdateUserData = (bodyData) => {
  return fetchWithRefresh(`${baseUrl}auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: localStorage.getItem('accessToken')
    },
    body: JSON.stringify(
      bodyData
    )
  })
    .then(checkErrorPromise)
}

export const api = {
  getInitialIngredients,
  getReserPassword,
  getForgotPassword,
  getUpdateUserData,
  getUpdateToken,
  checkUserAuth,
  numberOrders,
  getUserData,
  getRegister,
  getLogOut,
  getLogin,
}