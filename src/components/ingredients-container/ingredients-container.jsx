import React from 'react';
import { IngredientsList } from '../ingredients-list/ingredients-list';
import styles from './ingredients-container.module.css';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';

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
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      ingredientPropType,
    })
  ),
  title: PropTypes.string.isRequired,
};
