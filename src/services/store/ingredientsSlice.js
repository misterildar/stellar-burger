import { createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { getInitialIngredients } from '../../utils/ingredient-api';


export const getIngredients = createAsyncThunk(
  'ingredients/getIngredients',
  async function (_, { rejectWithValue }) {
    try {
      const { data } = await getInitialIngredients()
      if (data.length > 0) {
        return { data }
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);



const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    ingredients: [],
    loading: null,
    error: null
  },
  extraReducers: {
    [getIngredients.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },

    [getIngredients.rejected]: (state, action) => {
      state.loading = null;
      state.error = action.payload
    },

    [getIngredients.fulfilled]: (state, action) => {
      state.loading = null
      if (action.payload.data.length > 0) {
        state.ingredients = action.payload.data;
      };
    }
  }
})

const ingredientsState = state => state.burgerIngredients.ingredients




export const bunsIngredientsFind = createSelector(
  [ingredientsState],
  (ingredients) => {
    return ingredients.filter((el) => el.type === 'bun')
  }
)

export const saucesIngredientsFind = createSelector(
  [ingredientsState],
  (ingredients) => {
    return ingredients.filter((el) => el.type === 'sauce')
  }
)

export const mainsIngredientsFind = createSelector(
  [ingredientsState],
  (ingredients) => {
    return ingredients.filter((el) => el.type === 'main')
  }
)

export const getIngredientsState = (state) => state.burgerIngredients.ingredients;

export const getBurgerConstructor = (state) => state.burgerConstructor;

export const getStatus = (state) => state.burgerIngredients;


export default ingredientsSlice.reducer


