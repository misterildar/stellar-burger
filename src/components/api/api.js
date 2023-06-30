const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';

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
  return fetch(baseUrl).then(checkErrorPromise);
};
