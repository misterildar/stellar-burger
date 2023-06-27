import React from 'react';
import { IngredientsList } from '../ingredients-list/ingredients-list';
import styles from './ingredients-container.module.css';
import PropTypes from 'prop-types';

export const IngredientsContainer = ({ ingredients, title }) => {
  return (
    <div>
      <h2 className={`${styles.container} text_type_main-medium pt-4 `}>{title}</h2>
      <div className={`${styles.box} pl-8`}>
        {ingredients.map((el) => (
          <IngredientsList listIngredients={el} key={el._id} />
        ))}
      </div>
    </div>
  );
};

IngredientsContainer.propTypes = {
  listIngredients: PropTypes.array,
  title: PropTypes.string.isRequired,
};
