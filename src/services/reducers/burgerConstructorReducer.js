import React from 'react'
import { ADD_BURGER_INGREDIENTS, CLEAR_INGREDIENTS } from '../actions/burgerConstructorReducer';

const initialState = {
  ingredientBurger: [],
  bun: null
};


const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BURGER_INGREDIENTS: {
      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: action.payload,
        };
      }
    }

      return {
        ...state,
        ingredientBurger: [...state.ingredientBurger, { ...action.payload }],
      };

    case CLEAR_INGREDIENTS:
      return initialState;

    default:
      return { ...state };
  }

}

export default burgerConstructorReducer
