import React from 'react';
import styles from './ingredients-list.module.css';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

export const IngredientsList = ({ listIngredients }) => {
  const { image, name, price } = listIngredients;

  return (
    <div className={styles.list}>
      <Counter count={1} size="default" extraClass="m-1" />
      <img src={image} alt={name} />
      <div className={styles.box}>
        <p className={'text text_type_digits-default pr-2'}>{price}</p>
        <CurrencyIcon type="primary" />
      </div>
      <p className={`${styles.container} text text_type_main-default`}>{name}</p>
    </div>
  );
};
