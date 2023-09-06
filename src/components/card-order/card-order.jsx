import React from 'react';
import styles from './card-order.module.css';
import { Link, useLocation } from 'react-router-dom';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getIngredientsState } from '../../services/store/ingredientsSlice';
import { useSelector } from 'react-redux';

const CardOrder = ({ orderData }) => {
  const ingredients = useSelector(getIngredientsState);

  const location = useLocation();

  const orderIngredientsId = Array.from(new Set(orderData.ingredients));

  const orderIngredientData = ingredients.filter((el) =>
    orderIngredientsId.includes(el._id)
  );

  const totalPriceCardOrder = orderIngredientData.reduce(
    (acc, el) => acc + el.price,
    0
  );
  return (
    <Link
      to={`/order/${orderData.number}`}
      state={{ background: location }}
      className={styles.card}
    >
      <div className={styles.formatted_date}>
        <p className='text text_type_digits-default'>#{orderData.number}</p>

        <p className='text text_type_main-default text_color_inactive'>
          <FormattedDate date={new Date(orderData.createdAt)} /> i-GMT+3
        </p>
      </div>
      <p className={`${styles.card_name} text text_type_main-medium pt-6 pb-6`}>
        {orderData.name}
      </p>

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
                +{orderIngredientData.length - 5}
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
