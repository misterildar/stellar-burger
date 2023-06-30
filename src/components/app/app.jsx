import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { useEffect, useState } from 'react';
import { getInitialIngredients } from '../api/api';

function App() {
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
      <AppHeader />
      <main className={styles.container}>
        <BurgerIngredients ingredients={ingredients} />
        <BurgerConstructor ingredients={ingredients} />
      </main>
    </div>
  );
}

export default App;
