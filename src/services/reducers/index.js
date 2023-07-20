import { combineReducers } from 'redux';
import burgerConstructorReducer from './burgerConstructorReducer';
import burgerIngredientsReducer from './burgerIngredientsReducer';
import ingredientDetailsReducer from './ingredientDetailsReducer';
import orderDetailsReducer from './orderDetailsReducer';


export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  ingredientDetails: ingredientDetailsReducer,
  orderDetails: orderDetailsReducer
})

