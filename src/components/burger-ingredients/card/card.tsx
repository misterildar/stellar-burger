import React, { FC } from 'react';
import styles from './card.module.css';
import { useDrag } from 'react-dnd';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../../../hooks/hooks';
import { TIngredient } from '../../../utils/types';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { counterIngredientsFind } from '../../../services/store/constructorSlice';

interface ICard {
  listIngredients: TIngredient;
}

export const Card: FC<ICard> = ({ listIngredients }) => {
  const location = useLocation();

  const ingredientId = listIngredients['_id'];

  const { image, name, price, key } = listIngredients;

  const counterIngredients = useAppSelector(counterIngredientsFind);

  const count: number = counterIngredients[listIngredients._id];

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
