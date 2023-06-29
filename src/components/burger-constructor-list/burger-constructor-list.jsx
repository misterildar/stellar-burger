import React from 'react';
import styles from './burger-constructor-list.module.css';
import { CurrencyIcon, DragIcon, DeleteIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import PropTypes from 'prop-types';

export const BurgerConstructorList = ({ lists }) => {
  const { image, name, price } = lists;
  return (
    <div className={`${styles.box} pl-2 pb-5 `}>
      <DragIcon type="primary" />
      <div className={`${styles.container} p-4  ml-5`}>
        <div className={`${styles.box}`}>
          <img className={styles.image} src={image} alt={name} />
          <p className="text text_type_main-default">{name}</p>
        </div>
        <div className={`${styles.box} pr-2`}>
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

BurgerConstructorList.propTypes = {
  lists: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};
