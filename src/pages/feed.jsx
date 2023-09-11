import React from 'react';
import { useEffect } from 'react';
import styles from './page-style.module.css';
import Loader from '../components/loader/loader';
import { Modal } from '../components/modal/modal';
import { WS_ORDERS_URL } from '../utils/constants';
import { useDispatch, useSelector } from 'react-redux';
import CardOrder from '../components/card-order/card-order';
import FeedNumbers from '../components/feed-numbers/feed-numbers';
import { connect, disconnect } from '../services/store/wsOrdersSlice';

const Feed = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(connect(WS_ORDERS_URL));
    return () => {
      dispatch(disconnect());
    };
  }, [dispatch]);

  const { orders, status } = useSelector((state) => state.wsOrder);

  const showOrder = status === 'ONLINE' && orders.success === true;

  return showOrder ? (
    <div className={styles.feed_container}>
      <p className='text text_type_main-large pt-10 pb-10'>Лента заказов</p>

      <div className={styles.feed_box}>
        <div className={`${styles.feed_card_box} custom-scroll`}>
          {orders?.orders?.map((el) => (
            <CardOrder orderData={el} key={el._id} />
          ))}
        </div>
        <FeedNumbers
          total={orders.total}
          totalToday={orders.totalToday}
          orderData={orders}
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
