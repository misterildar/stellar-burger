import React from 'react';
import styles from './ingredient-details.module.css';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';

export const IngredientDetails = ({ listIngredients }) => {
  const { image, name, calories, proteins, fat, carbohydrates } =
    listIngredients;
  return (
    <div className="pt-15 pb-15">
      <p className={`${styles.title} text text_type_main-large`}>
        Детали ингредиента
      </p>
      <div className={styles.container}>
        <img src={image} alt={name} className={styles.image} />
        <p className="text text_type_main-medium pt-4 pb-6">{name}</p>

        <ul className={styles.box}>
          <li className={styles.description}>
            <p className="text text_type_main-default text_color_inactive">
              Калории, ккал
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {calories}
            </p>
          </li>
          <li className={styles.description}>
            <p className="text text_type_main-default text_color_inactive">
              Белки, г{' '}
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {proteins}
            </p>
          </li>
          <li className={styles.description}>
            <p className="text text_type_main-default text_color_inactive">
              Жиры, г{' '}
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {fat}
            </p>
          </li>
          <li className={styles.description}>
            <p className="text text_type_main-default text_color_inactive">
              Углеводы, г
            </p>
            <p className="text text_type_digits-default text_color_inactive">
              {carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

IngredientDetails.propTypes = {
  listIngredients: ingredientPropType.isRequired,
};
