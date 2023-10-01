import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { api } from '../../utils/api';
import { TingredientsSlice, TIngredient } from '../../utils/types';

export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async function (_, { rejectWithValue }) {
    try {
      const { data } = await api.getInitialIngredients();
      if (data.length > 0) {
        return { data };
      }
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState: TingredientsSlice = {
  ingredients: [],
  loading: null,
  error: null,
};

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(getIngredients.rejected, (state, action) => {
        state.loading = null;
        state.error = action.payload;
      })

      .addCase(getIngredients.fulfilled, (state, action: any) => {
        state.loading = null;
        if (action.payload.data.length > 0) {
          state.ingredients = action.payload.data;
        }
      });
  },
});

export const getIngredientsState = (state: any) =>
  state.burgerIngredients.ingredients;

export const getBurgerConstructor = (state: any) => state.burgerConstructor;

export const getStatus = (state: any) => state.burgerIngredients;

export const bunsIngredientsFind = createSelector(
  [getIngredientsState],
  (ingredients) => {
    return ingredients.filter((el: TIngredient) => el.type === 'bun');
  }
);

export const saucesIngredientsFind = createSelector(
  [getIngredientsState],
  (ingredients) => {
    return ingredients.filter((el: TIngredient) => el.type === 'sauce');
  }
);

export const mainsIngredientsFind = createSelector(
  [getIngredientsState],
  (ingredients) => {
    return ingredients.filter((el: TIngredient) => el.type === 'main');
  }
);

export default ingredientsSlice.reducer;
