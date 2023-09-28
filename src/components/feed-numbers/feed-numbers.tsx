import React, { FC } from 'react';
import FeedItemNumbers from '../feed-item-numbers/feed-item-numbers';
import styles from './feed-numbers.module.css';
import { TFeedNumbers, TCardOrder } from '../../utils/types';

interface IFeedNumbers {
  total: number;
  totalToday: number;
  orderData: TFeedNumbers;
}

const FeedNumbers: FC<IFeedNumbers> = ({ total, totalToday, orderData }) => {
  const finish = orderData.orders.filter(
    (el: TCardOrder) => el.status === 'done'
  );

  const working = orderData.orders.filter(
    (el: TCardOrder) => el.status === 'created'
  );

  return (
    <div>
      <div className={styles.finish_working}>
        <FeedItemNumbers text='Готовы:'>
          {finish.map((el: TCardOrder) => {
            return (
              <div
                className={`text text_type_digits-default ${styles.color}`}
                key={el._id}
              >
                {el.number}
              </div>
            );
          })}
        </FeedItemNumbers>

        <FeedItemNumbers text='В работе:'>
          {working.map((el: TCardOrder) => {
            return (
              <div className={'text text_type_digits-default'} key={el._id}>
                {el.number}
              </div>
            );
          })}
        </FeedItemNumbers>
      </div>
      <FeedItemNumbers
        text={'Выполнено за все время:'}
        className={'text text_type_digits-large pb-15'}
      >
        {total}
      </FeedItemNumbers>

      <FeedItemNumbers
        text={'Выполнено за сегодня:'}
        className={'text text_type_digits-large'}
      >
        {totalToday}
      </FeedItemNumbers>
    </div>
  );
};

export default FeedNumbers;
