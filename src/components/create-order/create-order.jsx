import React from 'react';
import { Button, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './create-order.module.css';

export const CreateOrder = ({ sum }) => {
  return (
    <div className={`${styles.container} pt-1 pr-6`}>
      <p className={'text text_type_digits-medium pr-2'}>{sum}</p>
      <div className={'pr-10'}>
        <CurrencyIcon type="primary" />
      </div>
      <Button htmlType="button" type="primary" size="medium">
        Оформить заказ
      </Button>
    </div>
  );
};