import { createSelector, createSlice } from '@reduxjs/toolkit';


const constructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState: {
    ingredientBurger: [],
    bun: null
  },

  reducers: {
    addBurgerIngredients(state, { payload }) {
      if (payload.item.type === 'bun') {
        state.bun = payload.item;
      } else {
        state.ingredientBurger = [...state.ingredientBurger, { ...payload.item, nanoidId: payload.nanoidId }]
      }
    },
    deleteIngredient(state, action) {
      state.ingredientBurger = state.ingredientBurger.filter(
        (_, index) => index !== action.payload);
    },
    moveIngredient(state, action) {
      state.ingredientBurger = action.payload;
    },
    clearIngredients(state) {
      state.ingredientBurger = []
      state.bun = null
    }
  }
})

const getBurgerIngredient = (state) => state.burgerConstructor.ingredientBurger

const getBun = (state) => state.burgerConstructor.bun

export const counterIngredientsFind = createSelector(
  [getBurgerIngredient, getBun],
  (ingredientBurger, bun) => {
    const counter = {}
    ingredientBurger.forEach((el) => {
      if (!counter[el._id]) counter[el._id] = null
      counter[el._id] += 1
    })
    if (bun) {
      counter[bun._id] = 2
    }
    return counter
  }
)

export const bunFind = createSelector(
  [getBun],
  (bun) => {
    return bun
  }
)

export const saucesAndMainsFind = createSelector(
  [getBurgerIngredient],
  (ingredientBurger) => {
    return ingredientBurger.filter((el) => el.type !== 'bun')
  }
)

export const totalPriceFind = createSelector(
  [getBurgerIngredient, getBun],
  (ingredientBurger, bun) => {
    const sumIngredient = ingredientBurger.reduce(
      (acc, price) => acc + price.price,
      0
    );
    const sumBun = bun ? bun.price * 2 : 0;
    return sumIngredient + sumBun;

  }
)

export const orderIngredientIdFind = createSelector(
  [getBurgerIngredient, getBun],
  (ingredientBurger, bun) => {
    const ingredientId = [];
    ingredientBurger.forEach((el) =>
      ingredientId.push(el._id)
    );
    if (bun) {
      ingredientId.push(bun._id);
    }
    return ingredientId;

  }
)

const countState = state => state.burgerIngredients.ingredients

const getBunCountFind = state => state.burgerConstructor.bun

export const getBurgerConstructor = (state) => state.burgerConstructor;

export const getMoveIngredientsState = (state) =>
  state.burgerConstructor.ingredientBurger;

export const bunCountFind = createSelector(
  [countState, getBunCountFind],
  (ingredients, bun) => {
    if (bun === null) {
      return;
    } else if (bun !== null && ingredients.filter(el => el._id === bun._id)) {
      return bun._id
    }
  })

export const { addBurgerIngredients, deleteIngredient, moveIngredient, clearIngredients } = constructorSlice.actions;

export default constructorSlice.reducer;


