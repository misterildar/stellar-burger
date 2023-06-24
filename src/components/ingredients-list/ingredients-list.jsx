import React from 'react';
import styles from './ingredients-list.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

export const IngredientsList = ({ listIngredients }) => {
  const { image, name, price } = listIngredients;

  return (
    <div className={`${styles.list} pb-8 pr-6`}>
      <Counter count={1} size="default" extraClass="m-1 mr-5" />
      <img src={image} alt={name} />
      <div className={`${styles.box} pt-2`}>
        <p className={'text text_type_digits-default pr-1'}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.container} pt-2 text text_type_main-default`}>{name}</p>
    </div>
  );
};
