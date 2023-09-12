import React, { useState } from 'react';
import styles from './card.module.css';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { counterIngredientsFind } from '../../../services/store/constructorSlice';

export const Card = ({ listIngredients }) => {
  const location = useLocation();

  const ingredientId = listIngredients['_id'];

  const { image, name, price, key } = listIngredients;

  const counterIngredients = useSelector(counterIngredientsFind);

  const count = counterIngredients[listIngredients._id];

  const [{ isDragging }, drag] = useDrag({
    type: 'ingredient',
    item: listIngredients,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0 : 1;

  return (
    <Link
      key={ingredientId}
      to={`ingredients/${ingredientId}`}
      state={{ background: location }}
      className={`${styles.list} pb-8 pr-6 `}
    >
      <div ref={drag} style={{ opacity }}>
        {count ? (
          <Counter count={count} size='default' extraClass='m-1 mr-5' />
        ) : (
          ''
        )}
        <img src={image} alt={name} className={styles.image} key={key} />
        <div className={`${styles.box} pt-2`}>
          <p className={'text text_type_digits-default pr-1'}>{price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <p className={`${styles.container} pt-2 text text_type_main-default`}>
          {name}
        </p>
      </div>
    </Link>
  );
};

Card.propTypes = {
  listIngredients: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};
