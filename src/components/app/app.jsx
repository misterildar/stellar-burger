import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { useEffect, useReducer, useState } from 'react';
import { getInitialIngredients } from '../api/api';
import {
  IngredientsContext,
  InitialIngredientsContext,
} from '../../services/ingredientsContext';

const ingredientsInitialState = {
  ingredientBurger: [],
  bun: null,
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

  const getInitialDataServer = () => {
    return getInitialIngredients().then((ingredients) => {
      setIngredients(ingredients.data);
    });
  };

  useEffect(() => {
    getInitialDataServer();
  }, []);
  return (
    <div className={styles.app}>
      <IngredientsContext.Provider value={ingredients}>
        <InitialIngredientsContext.Provider
          value={{ ingredientBurgerState, ingredientBurgerDispatch }}
        >
          <AppHeader />
          <main className={styles.container}>
            <BurgerIngredients />
            <BurgerConstructor />
          </main>
        </InitialIngredientsContext.Provider>
      </IngredientsContext.Provider>
    </div>
  );
}

export default App;
