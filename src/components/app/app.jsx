import styles from './app.module.css';
import { data } from '../../utils/data';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';

function App() {
  return (
    <div className={styles.app}>
      <AppHeader />
      <div className={styles.container}>
        <div className={styles.containerColumn}>
          <BurgerIngredients />
        </div>
        <div className={styles.containerColumn}>{/* <BurgerConstructor /> */}</div>
      </div>
    </div>
  );
}

export default App;
