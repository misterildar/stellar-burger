import React from 'react';
import styles from './burger-constructor-list.module.css';
import { CurrencyIcon, DragIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';

export const BurgerConstructorList = ({ lists }) => {
  const { image, name, price } = lists;
  return (
    <div className={`${styles.list} pt-4 pl-8 pb-4 pl-8`}>
      <DragIcon type="primary" />
      <div className={styles.container}>
        <div className={styles.box}>
          <img className={styles.image} src={image} alt={name} />
          <p className="text text_type_main-default">{name}</p>
        </div>
        <div className={styles.box}>
          <div className={`${styles.box} pr-5`}>
            <p className={'text text_type_digits-default pr-2'}>{price}</p>
            <CurrencyIcon type="primary" />
          </div>
          <DeleteIcon type="primary" />
        </div>
      </div>
    </div>
  );
};
