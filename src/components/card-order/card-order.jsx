import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import styles from './card-order.module.css';
import { Link, useLocation } from 'react-router-dom';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getIngredientsState } from '../../services/store/ingredientsSlice';
import { object } from 'prop-types';

const CardOrder = ({ orderData, isStatus = false }) => {
  const ingredientsAll = useSelector(getIngredientsState);

  const location = useLocation();

  const orderIngredientDataAll = orderData?.ingredients.map((id) =>
    ingredientsAll?.find((ingr) => ingr._id === id)
  );

  const orderIngredientData = useMemo(
    () => orderIngredientDataAll.filter((el) => el !== undefined),
    [orderIngredientDataAll]
  );

  const bun = useMemo(
    () => orderIngredientData?.find((el) => el.type === 'bun'),
    [orderIngredientData]
  );

  const saucesAndMains = useMemo(
    () => orderIngredientData?.filter((el) => el.type !== 'bun'),
    [orderIngredientData]
  );

  const saucesAndMainsPrice = saucesAndMains?.reduce(
    (acc, el) => acc + el.price,
    0
  );

  const totalPriceCardOrder = saucesAndMainsPrice + bun?.price * 2;

  let status =
    orderData?.status == 'done'
      ? { text: 'Выполнен', statusColor: '#00CCCC' }
      : orderData == 'created'
      ? { text: 'Создается', statusColor: '#F2F2F3' }
      : { text: 'В ожидании', statusColor: '#F2F2F3' };

  return (
    <Link
      to={`${location.pathname}/${orderData.number}`}
      state={{ background: location }}
      className={styles.card}
    >
      <div className={styles.formatted_date}>
        <p className='text text_type_digits-default'>#{orderData.number}</p>

        <p className='text text_type_main-default text_color_inactive'>
          <FormattedDate date={new Date(orderData.createdAt)} />
        </p>
      </div>
      <p className={`${styles.card_name} text text_type_main-medium pt-6 pb-3`}>
        {orderData.name}
      </p>
      {isStatus && (
        <p
          className='text text_type_main-default m-0'
          style={{ color: status.statusColor }}
        >
          {status.text}
        </p>
      )}
      <div className={styles.image_price}>
        <div className={styles.image_container}>
          {orderIngredientData.slice(0, 6).map((el, index) => {
            return (
              <div
                className={styles.image_box}
                key={index}
                style={{
                  transform: `translateX(${40 * index}px)`,
                  zIndex: `${6 - index}`,
                }}
              >
                <img
                  className={styles.image}
                  src={el.image_mobile}
                  alt={el.name}
                />
              </div>
            );
          })}
          {orderIngredientData.length > 5 && (
            <div className={styles.counter_container}>
              <p className={`text text_type_digits-default ${styles.counter}`}>
                +{orderData.ingredients.length - 5}
              </p>
            </div>
          )}
        </div>

        <div className={styles.price}>
          <p className='text text_type_digits-default'>{totalPriceCardOrder}</p>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </Link>
  );
};
export default CardOrder;
