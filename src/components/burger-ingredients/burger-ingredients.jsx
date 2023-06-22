import React from 'react';
import styles from './burger-ingredients.module.css';
import { data } from '../../utils/data';
import { IngredientsContainer } from '../ingredients-container/ingredients-container';

export const BurgerIngredients = () => {
  const buns = data.filter((el) => el.type === 'bun');
  const sauces = data.filter((el) => el.type === 'sauce');
  const mains = data.filter((el) => el.type === 'main');

  return (
    <section className={styles.section}>
      <h1 className="text text_type_main-large pt-10 pb-5">Соберите бургер</h1>

      <nav>
        <ul className={`${styles.navBurger} pb-10`}>
          <li>
            <p className="text text_type_main-default">Булки</p>
          </li>
          <li>
            <p className="text text_type_main-default">Соусы</p>
          </li>
          <li>
            <p className="text text_type_main-default">Начинки</p>
          </li>
        </ul>
      </nav>
      <div className={`${styles.container} custom-scroll`}>
        <IngredientsContainer title="Булки" ingredients={buns} />
        <IngredientsContainer title="Соусы" ingredients={sauces} />
        <IngredientsContainer title="Начинки" ingredients={mains} />
      </div>
    </section>
  );
};
