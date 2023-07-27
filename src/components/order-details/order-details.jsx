import React, { useContext } from 'react';
import styles from './order-details.module.css';
import done from '../../images/done.svg';
import { useSelector } from 'react-redux';

export const OrderDetails = () => {
  const { order } = useSelector((store) => store.orderDetails.orderDetails);

  return (
    <div className={`${styles.container} pt-30 pb-30`}>
      <p className="text text_type_digits-large">{order.number}</p>
      <p className="text text_type_main-medium pt-8 pb-15">
        {'идентификатор заказа'}
      </p>
      <img src={done} alt="V" />
      <p className="text text_type_main-default pt-20 pb-2">
        {'Ваш заказ начали готовить'}
      </p>
      <p className="text text_type_main-default text_color_inactive ">
        {'Дождитесь готовности на орбитальной станции'}
      </p>
    </div>
  );
};
