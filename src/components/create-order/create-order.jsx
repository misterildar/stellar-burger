import React, { useState } from 'react';
import {
  Button,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './create-order.module.css';
import { Modal } from '../modal/modal';
import { OrderDetails } from '../order-details/order-details';
import PropTypes from 'prop-types';
import { numberOrders } from '../api/api';
import { useDispatch } from 'react-redux';
import { ORDER } from '../../services/actions/orderDetailsReducer';
import { CLEAR_INGREDIENTS } from '../../services/actions/burgerConstructorReducer';

export const CreateOrder = ({ totalPrice, orderIngredientId }) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    return numberOrders(orderIngredientId).then((data) => {
      dispatch({ type: ORDER, payload: data });
      dispatch({ type: CLEAR_INGREDIENTS });
      setShowModal(true);
    });
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className={`${styles.container} pt-1 pr-6`}>
      <p className={'text text_type_digits-medium pr-2'}>{totalPrice}</p>
      <div className={'pr-10'}>
        <CurrencyIcon type="primary" />
      </div>
      <Button
        htmlType="button"
        type="primary"
        size="medium"
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
