const baseUrl = 'https://norma.nomoreparties.space/api/';

const checkErrorPromise = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json().then((err) => {
    err.statusCode = res.status;
    return Promise.reject(err);
  });
};

export const getInitialIngredients = () => {
  return fetch(`${baseUrl}ingredients`).then(checkErrorPromise);
};

export const numberOrders = (arrayIdOrder) => {
  return fetch(`${baseUrl}orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      'ingredients': arrayIdOrder,
    })
  })
    .then(checkErrorPromise)
}

