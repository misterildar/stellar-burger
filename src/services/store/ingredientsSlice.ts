import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from '@reduxjs/toolkit';
import { RootState } from '..';
import { api } from '../../utils/api';
import { TingredientsSlice, TIngredient } from '../../utils/types';

interface IgetIngredients {
  success: boolean;
  data: TIngredient[];
}

export const getIngredients = createAsyncThunk<IgetIngredients>(
  'ingredients/getIngredients',
  async function (_, { rejectWithValue }) {
    try {
      return await api.getInitialIngredients();
    } catch (error) {
      return rejectWithValue(error);
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

      .addCase(getIngredients.fulfilled, (state, action) => {
        state.loading = null;
        if (action.payload?.data.length > 0) {
          state.ingredients = action.payload?.data;
        }
      });
  },
});

export const getIngredientsState = (state: RootState) =>
  state.burgerIngredients.ingredients;

export const getBurgerConstructor = (state: RootState) =>
  state.burgerConstructor;

export const getStatus = (state: RootState) => state.burgerIngredients;

export const bunsIngredientsFind = createSelector(
  [getIngredientsState],
  (ingredients) => {
    return ingredients?.filter((el) => el.type === 'bun');
  }
);

export const saucesIngredientsFind = createSelector(
  [getIngredientsState],
  (ingredients) => {
    return ingredients?.filter((el) => el.type === 'sauce');
  }
);

export const mainsIngredientsFind = createSelector(
  [getIngredientsState],
  (ingredients) => {
    return ingredients?.filter((el) => el.type === 'main');
  }
);

export default ingredientsSlice.reducer;
