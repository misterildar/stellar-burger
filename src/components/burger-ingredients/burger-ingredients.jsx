import React from 'react';
import styles from './burger-ingredients.module.css';
import { IngredientsContainer } from '../ingredients-container/ingredients-container';
import { Navigation } from '../navigation/navigation';

export const BurgerIngredients = ({ data }) => {
  const buns = data.filter((el) => el.type === 'bun');
  const sauces = data.filter((el) => el.type === 'sauce');
  const mains = data.filter((el) => el.type === 'main');

  return (
    <section className={'pl-25'}>
      <h1 className="text text_type_main-large pt-8 pb-5">Соберите бургер</h1>
      <Navigation />
      <div className={`${styles.container} custom-scroll`}>
        <IngredientsContainer title="Булки" ingredients={buns} />
        <IngredientsContainer title="Соусы" ingredients={sauces} />
        <IngredientsContainer title="Начинки" ingredients={mains} />
      </div>
    </section>
  );
};
