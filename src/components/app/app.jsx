import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { useEffect, useState } from 'react';

function App() {
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    getInitialDataServer();
  }, []);

  const baseUrl = 'https://norma.nomoreparties.space/api/ingredients';

  const checkErrorPromise = (res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => {
      err.statusCode = res.status;
      return Promise.reject(err);
    });
  };

  const getInitialIngredients = () => {
    return fetch(baseUrl).then(checkErrorPromise);
  };
  const getInitialDataServer = () => {
    return getInitialIngredients().then((ingredients) => {
      setIngredients(ingredients.data);
    });
  };

  return (
    <div className={styles.app}>
      <AppHeader />
      <main className={styles.container}>
        <BurgerIngredients data={ingredients} />
        <BurgerConstructor data={ingredients} />
      </main>
    </div>
  );
}

export default App;
