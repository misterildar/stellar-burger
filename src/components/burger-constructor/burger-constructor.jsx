import React, { useMemo } from 'react';
import styles from './burger-constructor.module.css';
import { BurgerConstructorList } from '../burger-constructor-list/burger-constructor-list';
import { CreateOrder } from '../create-order/create-order';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';

export const BurgerConstructor = ({ ingredients }) => {
  let sum = useMemo(() => ingredients.reduce((acc, price) => acc + price.price, 0), [ingredients]);

  return (
    <section className={styles.section}>
      <div className={`${styles.box} custom-scroll mt-15 pb-10`}>
        {ingredients.map((el) => (
          <BurgerConstructorList lists={el} key={el._id} />
        ))}
      </div>
      <CreateOrder sum={sum} />
    </section>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(
    PropTypes.shape({
      ingredientPropType,
    })
  ),
};
