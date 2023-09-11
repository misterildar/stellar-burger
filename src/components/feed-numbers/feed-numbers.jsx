import React from 'react';
import FeedItemNumbers from '../feed-item-numbers/feed-item-numbers';
import styles from './feed-numbers.module.css';

const FeedNumbers = ({ total, totalToday, orderData }) => {
  const finish = orderData.orders.filter((el) => el.status === 'done');

  const working = orderData.orders.filter((el) => el.status === 'created');

  return (
    <div>
      <div className={styles.finish_working}>
        <FeedItemNumbers text='Готовы:'>
          {finish.map((el) => {
            return (
              <div
                className={`text text_type_digits-default ${styles.color}`}
                key={el}
              >
                {el.number}
              </div>
            );
          })}
        </FeedItemNumbers>

        <FeedItemNumbers text='В работе:'>
          {working.map((el) => {
            return (
              <div className={'text text_type_digits-default'} key={el}>
                {el.number}
              </div>
            );
          })}
        </FeedItemNumbers>
      </div>

      <FeedItemNumbers
        text={'Выполнено за все время:'}
        classNumber={'text text_type_digits-large pb-15'}
      >
        {total}
      </FeedItemNumbers>

      <FeedItemNumbers
        text={'Выполнено за сегодня:'}
        classNumber={'text text_type_digits-large'}
      >
        {totalToday}
      </FeedItemNumbers>
    </div>
  );
};

export default FeedNumbers;
