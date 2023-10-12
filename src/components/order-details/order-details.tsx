import React, { useEffect, FC } from 'react';
import { Modal } from '../modal/modal';
import Loader from '../loader/loader';
import {
  getOrderImageDetails,
  orderImageDetailsStore,
} from '../../services/store/orderDetailsSlice';
import { useParams } from 'react-router-dom';
import styles from './order-details.module.css';
import { TCardOrder } from '../../utils/types';
import { colorStatus } from '../../utils/functions';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {
  CurrencyIcon,
  FormattedDate,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getIngredientsState } from '../../services/store/ingredientsSlice';

const OrderDetails: FC = () => {
  const { id } = useParams();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getOrderImageDetails(id));
  }, [id, dispatch]);

  const ingredientsAll = useAppSelector(getIngredientsState);

  const orderDataArr = useAppSelector(orderImageDetailsStore);

  const orderData = orderDataArr as TCardOrder;

  const counter: { [count: string]: number } = {};

  orderData?.ingredients.forEach((el: any) => {
    if (!counter[el]) {
      counter[el] = 1;
    } else {
      counter[el]++;
    }
  });

  const orderIngredientData = orderData?.ingredients.map(
    (id) => ingredientsAll?.filter((el) => el._id === id)[0]
  );

  const orderIngredientsId = Array.from(new Set(orderData?.ingredients));

  const ingredientsImageContainer = ingredientsAll?.filter((el) =>
    orderIngredientsId.includes(el._id)
  );

  const bun = orderIngredientData?.filter((el) => el.type === 'bun')[0];

  const saucesAndMains = orderIngredientData?.filter((el) => el.type !== 'bun');

  const saucesAndMainsPrice = saucesAndMains?.reduce(
    (acc, el) => acc + el.price,
    0
  );

  const totalPriceCardOrder =
    saucesAndMainsPrice + (bun === undefined ? 0 : bun?.price * 2);

  const status = colorStatus(orderData);

  return orderData ? (
    <div className={styles.detailes}>
      <p className={`${styles.number} text text_type_digits-default`}>
        #{orderData.number}
      </p>
      <p className={`${styles.name} text text_type_main-medium pt-10 pb-3 `}>
        {orderData.name}
      </p>
      <p
        className='text text_type_main-default pb-10'
        style={{ color: status.statusColor }}
      >
        {status.text}
      </p>
      <p className='text text_type_main-medium m-0 pb-6'>Состав:</p>
      <div className={styles.image_container}>
        <div className={`${styles.image_price_box} custom-scroll`}>
          {ingredientsImageContainer?.map((el, index) => {
            return (
              <div className={styles.image_price} key={index}>
                <div className={styles.image_name}>
                  <div className={styles.image_box}>
                    <img
                      className={styles.image}
                      src={el.image_mobile}
                      alt={el.name}
                    />
                  </div>
                  <p
                    className={`text text_type_main-default pl-4 ${styles.name}`}
                  >
                    {el.name}
                  </p>
                </div>
                <div className={styles.price_icon}>
                  <p className='text text_type_digits-default pr-4'>
                    {el.type === 'bun' ? 2 : counter[el._id]} x {el.price}
                  </p>
                  <CurrencyIcon type='primary' />
                </div>
              </div>
            );
          })}
        </div>
        <div className={styles.formatted_date}>
          <p className='text text_type_main-default text_color_inactive'>
            <FormattedDate date={new Date(orderData.createdAt)} />
          </p>
          <div className={styles.number}>
            <p className='text text_type_digits-default pr-4'>
              {totalPriceCardOrder}
            </p>
            <CurrencyIcon type='primary' />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Modal>
      <Loader text={'Что то пошло не так :('} />
    </Modal>
  );
};

export default OrderDetails;
