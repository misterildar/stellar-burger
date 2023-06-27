import React from 'react';
import styles from './burger-constructor.module.css';
import { BurgerConstructorList } from '../burger-constructor-list/burger-constructor-list';
import { CreateOrder } from '../create-order/create-order';
import PropTypes from 'prop-types';

export const BurgerConstructor = ({ data }) => {
  let sum = data.reduce((acc, price) => acc + price.price, 0);

  return (
    <section className={styles.section}>
      <div className={`${styles.box} custom-scroll mt-15 pb-10`}>
        {data.map((el) => (
          <BurgerConstructorList lists={el} key={el._id} />
        ))}
      </div>
      <CreateOrder sum={sum} />
    </section>
  );
};

BurgerConstructor.propTypes = {
  data: PropTypes.array,
};
