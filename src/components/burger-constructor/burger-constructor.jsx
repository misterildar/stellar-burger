import React, { useMemo } from 'react';
import styles from './burger-constructor.module.css';
// import { BurgerConstructorList } from '../burger-constructor-list/burger-constructor-list';
import { CurrencyIcon, DragIcon, DeleteIcon, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

import { CreateOrder } from '../create-order/create-order';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';

export const BurgerConstructor = ({ ingredients }) => {
  let sum = useMemo(() => ingredients.reduce((acc, price) => acc + price.price, 0), [ingredients]);

  const saucesAndMains = useMemo(() => ingredients.filter((el) => el.type === 'sauce' || el.type === 'main'), [ingredients]);

  return (
    <section className={styles.section}>
      <div className={styles.box}>
        <ConstructorElement type="top" isLocked={true} text="Краторная булка N-200i (верх)" price={200} thumbnail={'img'} />

        <div className={`${styles.container} custom-scroll`}>
          {saucesAndMains.map((el) => {
            return (
              <div key={el._id} className={styles.item}>
                <DragIcon type="primary" />
                <ConstructorElement text={el.name} price={el.price} thumbnail={el.image} />
              </div>
            );
          })}
        </div>

        <ConstructorElement type="bottom" isLocked={true} text="Краторная булка N-200i (низ)" price={200} thumbnail={'img'} />
      </div>
      <CreateOrder sum={sum} />
    </section>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
};
