import { configureStore } from '@reduxjs/toolkit';
import constructorSlice from './store/constructorSlice';
import ingredientsSlice from './store/ingredientsSlice';
import orderDetailsSlice from './store/orderDetailsSlice';
import userSlice from './store/userSlice';

export default configureStore({
  reducer: {
    burgerConstructor: constructorSlice,
    burgerIngredients: ingredientsSlice,
    orderDetails: orderDetailsSlice,
    user: userSlice
  }
})


