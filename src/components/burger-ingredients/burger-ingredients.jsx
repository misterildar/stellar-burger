import React, { useMemo } from 'react';
import styles from './burger-ingredients.module.css';
import { IngredientsContainer } from '../ingredients-container/ingredients-container';
import { Navigation } from '../navigation/navigation';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';

export const BurgerIngredients = ({ ingredients }) => {
  const buns = useMemo(() => ingredients.filter((el) => el.type === 'bun'), [ingredients]);
  const sauces = useMemo(() => ingredients.filter((el) => el.type === 'sauce'), [ingredients]);
  const mains = useMemo(() => ingredients.filter((el) => el.type === 'main'), [ingredients]);

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

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      ingredientPropType,
    })
  ),
};
