import React from 'react';
import styles from './burger-constructor.module.css';
import { BurgerConstructorList } from '../burger-constructor-list/burger-constructor-list';

export const BurgerConstructor = ({ data }) => {
  return (
    <div className={`${styles.box} pt-25 pb-10`}>
      {data.map((el) => (
        <BurgerConstructorList lists={el} key={el._id} />
      ))}
    </div>
  );
};
