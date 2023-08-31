import React from 'react';
import { useSelector } from 'react-redux';
import done from '../../../images/done.svg';
import styles from './order-details.module.css';
import {
  orderDetailsStore,
  requestStore,
} from '../../../services/store/orderDetailsSlice';

export const OrderDetails = () => {
  const loader = useSelector(requestStore);

  const { order } = useSelector(orderDetailsStore);

  return (
    <div className={`${styles.container} pt-30 pb-30`}>
      {loader && (
        <h1 className='text text_type_main-medium pt-15'>
          {'Данные загружаются...'}
        </h1>
      )}
      {!loader && (
        <>
          <p className='text text_type_digits-large'>{order.number}</p>
          <p className='text text_type_main-medium pt-8 pb-15'>
            {'идентификатор заказа'}
          </p>
          <img src={done} alt='V' />
          <p className='text text_type_main-default pt-20 pb-2'>
            {'Ваш заказ начали готовить'}
          </p>
          <p className='text text_type_main-default text_color_inactive '>
            {'Дождитесь готовности на орбитальной станции'}
          </p>
        </>
      )}
    </div>
  );
};
