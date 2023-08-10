import styles from './app.module.css';
import { AppHeader } from '../app-header/app-header';
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../burger-constructor/burger-constructor';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Modal } from '../modal/modal';
import { getStatus } from '../../services/store/ingredientsSlice';
import { useSelector } from 'react-redux';
import Loader from '../loader/loader';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getIngredients } from '../../services/store/ingredientsSlice';

function App() {
  const { loading, error } = useSelector(getStatus);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      {loading && (
        <Modal>
          <Loader text={'Идет загрузка данных ...'} />
        </Modal>
      )}
      {error && (
        <Modal>
          <Loader text={`Произошла ошибка: ${error}`} />
        </Modal>
      )}
      <main className={styles.container}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </main>
    </div>
  );
}

export default App;
