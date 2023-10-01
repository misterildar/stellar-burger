import React, { FC } from 'react';
import { useEffect } from 'react';
import styles from './page-style.module.css';
import Loader from '../components/loader/loader';
import { Modal } from '../components/modal/modal';
import { WS_ORDERS_URL } from '../utils/constants';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import CardOrder from '../components/card-order/card-order';
import FeedNumbers from '../components/feed-numbers/feed-numbers';
import { connect, disconnect } from '../services/store/wsOrdersSlice';
import { TCardOrder } from '../utils/types';

const Feed: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(connect(WS_ORDERS_URL));
    return () => {
      dispatch(disconnect('ORDERS_DISCONNECT'));
    };
  }, [dispatch]);

  const { order, status } = useAppSelector((state) => state.wsOrder);

  const showOrder = status === 'ONLINE' && order?.success === true;

  return showOrder ? (
    <div className={styles.feed_container}>
      <p className='text text_type_main-large pt-10 pb-10'>Лента заказов</p>

      <div className={styles.feed_box}>
        <div className={`${styles.feed_card_box} custom-scroll`}>
          {order?.orders?.map((el: TCardOrder) => (
            <CardOrder orderData={el} key={el._id} />
          ))}
        </div>
        <FeedNumbers
          total={order.total}
          totalToday={order.totalToday}
          orderData={order}
        />
      </div>
    </div>
  ) : (
    <Modal>
      <Loader text={'Идет загрузка данных ...'} />
    </Modal>
  );
};

export default Feed;
