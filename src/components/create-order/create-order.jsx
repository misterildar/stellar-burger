import React, { useState } from 'react';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './create-order.module.css';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { clearIngredients } from '../../services/store/constructorSlice';
import { getBurgerConstructor } from '../../services/store/constructorSlice';
import { getOrder } from '../../services/store/orderDetailsSlice';

export const CreateOrder = ({ totalPrice, orderIngredientId }) => {
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);

  const { ingredientBurger, bun } = useSelector(getBurgerConstructor);

  const ingredients = ingredientBurger.length >= 1 && bun;

  const openModal = () => {
    dispatch(getOrder(orderIngredientId));
    dispatch(clearIngredients());
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={`${styles.container} pt-1 pr-6`}>
      <p className={'text text_type_digits-medium pr-2'}>{totalPrice}</p>
      <div className={'pr-10'}>
        <CurrencyIcon type='primary' />
      </div>
      <Button
        htmlType='button'
        type='primary'
        size='medium'
        disabled={!ingredients}
        onClick={openModal}
      >
        Оформить заказ
      </Button>
      {showModal && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </div>
  );
};

CreateOrder.propTypes = {
  sum: PropTypes.number,
};
