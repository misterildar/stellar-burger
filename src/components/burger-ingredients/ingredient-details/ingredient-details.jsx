import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import styles from './ingredient-details.module.css';
import { getIngredientsState } from '../../../services/store/ingredientsSlice';

export const IngredientDetails = () => {
  const { ingredientId } = useParams();

  const ingredientsState = useSelector(getIngredientsState);

  const ingredient = ingredientsState.find((item) => item._id === ingredientId);

  return ingredient ? (
    <div className='pt-15 pb-15'>
      <p className={`${styles.title} text text_type_main-large`}>
        Детали ингредиента
      </p>
      <div className={styles.container}>
        <img
          src={ingredient.image}
          alt={ingredient.name}
          className={styles.image}
        />
        <p className='text text_type_main-medium pt-4 pb-6'>
          {ingredient.name}
        </p>

        <ul className={styles.box}>
          <li className={styles.description}>
            <p className='text text_type_main-default text_color_inactive'>
              Калории, ккал
            </p>
            <p className='text text_type_digits-default text_color_inactive'>
              {ingredient.calories}
            </p>
          </li>
          <li className={styles.description}>
            <p className='text text_type_main-default text_color_inactive'>
              Белки, г{' '}
            </p>
            <p className='text text_type_digits-default text_color_inactive'>
              {ingredient.proteins}
            </p>
          </li>
          <li className={styles.description}>
            <p className='text text_type_main-default text_color_inactive'>
              Жиры, г{' '}
            </p>
            <p className='text text_type_digits-default text_color_inactive'>
              {ingredient.fat}
            </p>
          </li>
          <li className={styles.description}>
            <p className='text text_type_main-default text_color_inactive'>
              Углеводы, г
            </p>
            <p className='text text_type_digits-default text_color_inactive'>
              {ingredient.carbohydrates}
            </p>
          </li>
        </ul>
      </div>
    </div>
  ) : null;
};
