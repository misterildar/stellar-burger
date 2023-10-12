import React, { FC } from 'react';
import { useEffect } from 'react';
import {
  connectProfile,
  disconnectProfile,
} from '../services/store/wsProfileOrdersSlice';
import styles from './page-style.module.css';
import Loader from '../components/loader/loader';
import { Modal } from '../components/modal/modal';
import { WS_ORDERS_PROFILE_URL } from '../utils/constants';
import CardOrder from '../components/card-order/card-order';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';

const ProfileHistoryOrders: FC = () => {
  const dispatch = useAppDispatch();

  const token = localStorage.getItem('accessToken')?.split('Bearer ')[1];

  useEffect(() => {
    dispatch(connectProfile(`${WS_ORDERS_PROFILE_URL}?token=${token}`));
    return () => {
      dispatch(disconnectProfile());
    };
  }, [dispatch, token]);

  const { order, status } = useAppSelector((state) => state.wsProfileOrder);

  const showOrder = status === 'ONLINE' && order?.success === true;

  const isNoOrders = status === 'ONLINE' && order?.orders.length === 0;

  return showOrder ? (
    <div className={styles.profile_order}>
      <div className={`${styles.profile_card_box} custom-scroll`}>
        {order.orders
          ?.map((el) => (
            <CardOrder orderData={el} key={el._id} isStatus={true} />
          ))
          .reverse()}
      </div>
    </div>
  ) : isNoOrders ? (
    <Modal>
      <Loader text={'У вас пока нет созданных заказов'} />
    </Modal>
  ) : (
    <Modal>
      <Loader text={'Идет загрузка данных ...__ Или произошла ошибка'} />
    </Modal>
  );
};
export default ProfileHistoryOrders;
