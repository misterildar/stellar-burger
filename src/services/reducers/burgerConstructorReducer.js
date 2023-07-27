import React from 'react'
import { ADD_BURGER_INGREDIENTS, CLEAR_INGREDIENTS, DELETE_INGREDIENT, MOVE_INGREDIENT } from '../actions/burgerConstructorReducer';

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
        ingredientBurger: [...state.ingredientBurger, { ...action.payload, key: action.key }],
      };

    case DELETE_INGREDIENT: {
      return {
        ...state,
        ingredientBurger: [...state.ingredientBurger].filter(
          (el, index) => index !== action.payload

        ),
      };
    }

    case MOVE_INGREDIENT: {
      return {
        ...state,
        ingredientBurger: action.payload
      }
    }

    case CLEAR_INGREDIENTS:
      return initialState;

    default:
      return { ...state };
  }

}

export default burgerConstructorReducer
