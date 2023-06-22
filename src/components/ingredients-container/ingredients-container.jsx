import React from 'react';
import { IngredientList } from '../ingredients-list/ingredients-list';
import styles from './ingredients-container.module.css';

export const IngredientsContainer = ({ title, ingredients }) => {
  return (
    <div>
      <h2 className="text_type_main-medium pt-6">{title}</h2>
      <div className={styles.box}>
        {ingredients.map((el) => (
          <IngredientList listIngredients={el} key={el._id} />
        ))}
      </div>
    </div>
  );
};
