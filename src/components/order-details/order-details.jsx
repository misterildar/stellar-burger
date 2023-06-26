import React from 'react';
import styles from './order-details.module.css';
import done from '../../images/done.svg';

export const OrderDetails = () => {
  return (
    <div className={`${styles.container} pt-30 pb-30`}>
      <p className="text text_type_digits-large">{'22 web +'}</p>
      <p className="text text_type_main-medium mt-8 mb-15">{'идентификатор заказа'}</p>
      <img src={done} alt="V" />
      <p className="text text_type_main-default mt-15 mb-2">{'Ваш заказ начали готовить'}</p>
      <p className="text text_type_main-default text_color_inactive ">{'Дождитесь готовности на орбитальной станции'}</p>
    </div>
  );
};
