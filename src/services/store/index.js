import { configureStore } from '@reduxjs/toolkit';
import constructorSlice from './constructorSlice';
import ingredientsSlice from './ingredientsSlice';
import orderDetailsSlice from './orderDetailsSlice';

export default configureStore({
  reducer: {
    burgerConstructor: constructorSlice,
    burgerIngredients: ingredientsSlice,
    orderDetails: orderDetailsSlice
  }
})


