import React, { FC } from 'react';
import { DndProvider } from 'react-dnd';
import styles from './page-style.module.css';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BurgerIngredients } from '../components/burger-ingredients/burger-ingredients';
import { BurgerConstructor } from '../components/burger-constructor/burger-constructor';

const Home: FC = () => {
  return (
    <div className={styles.page}>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </div>
  );
};

export default Home;
