import React from 'react';
import { IngredientsList } from '../ingredients-list/ingredients-list';
import styles from './ingredients-container.module.css';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';

export const IngredientsContainer = React.forwardRef((props, ref) => {
  console.log(ref);
  return (
    <div>
      <h2
        ref={ref}
        className={`${styles.container} text_type_main-medium pt-4 `}
      >
        {props.title}
      </h2>
      <div className={`${styles.box} pl-8`}>
        {props.ingredients.map((el) => (
          <IngredientsList listIngredients={el} key={el._id} />
        ))}
      </div>
    </div>
  );
});

IngredientsContainer.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
  title: PropTypes.string.isRequired,
};
