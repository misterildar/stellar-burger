import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { useEffect, useReducer, useState } from 'react';
import { getInitialIngredients } from '../api/api';
import {
  IngredientsContext,
  IngredientsStateContext,
  IngredientsDispatchContext,
} from '../../services/ingredientsContext';

const ingredientsInitialState = {
  ingredientBurger: [],
  bun: null,
  orderDetails: {},
};

function reducer(state, action) {
  switch (action.type) {
    case 'add':
      if (action.payload.type === 'bun') {
        return {
          ...state,
          bun: action.payload,
        };
      }

      return {
        ...state,
        ingredientBurger: [...state.ingredientBurger, { ...action.payload }],
      };

    case 'order':
      return {
        ...state,
        orderDetails: { ...state.orderDetails, ...action.payload },
        ingredientBurger: [],
        bun: null,
      };

    case 'delet':
      return ingredientsInitialState;

    default:
      return { ...state };
  }
}

function App() {
  const [ingredientBurgerState, ingredientBurgerDispatch] = useReducer(
    reducer,
    ingredientsInitialState
  );

  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    getInitialIngredients().then((ingredients) => {
      setIngredients(ingredients.data);
    });
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <IngredientsContext.Provider value={ingredients}>
        <IngredientsStateContext.Provider value={ingredientBurgerState}>
          <IngredientsDispatchContext.Provider value={ingredientBurgerDispatch}>
            <main className={styles.container}>
              <BurgerIngredients />
              <BurgerConstructor />
            </main>
          </IngredientsDispatchContext.Provider>
        </IngredientsStateContext.Provider>
      </IngredientsContext.Provider>
    </div>
  );
}

export default App;
