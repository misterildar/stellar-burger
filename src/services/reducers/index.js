import { combineReducers } from 'redux';
import burgerConstructorReducer from './burgerConstructorReducer';
import burgerIngredientsReducer from './burgerIngredientsReducer';
import orderDetailsReducer from './orderDetailsReducer';


export const rootReducer = combineReducers({
  burgerConstructor: burgerConstructorReducer,
  burgerIngredients: burgerIngredientsReducer,
  orderDetails: orderDetailsReducer,
})

