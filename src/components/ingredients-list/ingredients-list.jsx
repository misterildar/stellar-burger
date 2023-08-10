import React, { useMemo, useState } from 'react';
import styles from './ingredients-list.module.css';
import {
  CurrencyIcon,
  Counter,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { IngredientDetails } from '../ingredient-details/ingredient-details';
import { Modal } from '../modal/modal';
import PropTypes from 'prop-types';
import { useDrag } from 'react-dnd';
import { useSelector } from 'react-redux';
import {
  getBurgerConstructor,
  bunCountFind,
} from '../../services/store/constructorSlice';

export const IngredientsList = ({ listIngredients }) => {
  const { image, name, price, key } = listIngredients;

  const { ingredientBurger } = useSelector(getBurgerConstructor);

  const countBun = useSelector(bunCountFind);

  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [{ isDragging }, drag] = useDrag({
    type: 'ingredient',
    item: listIngredients,
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const countIngredient = useMemo(() => {
    const elementId = ingredientBurger.filter(
      (el) => el._id === listIngredients._id
    );
    return elementId.length;
  }, [listIngredients, ingredientBurger]);

  const countBuns = useMemo(() => {
    return listIngredients.type === 'bun' && listIngredients._id === countBun;
  }, [listIngredients, countBun]);

  const countIngredients = useMemo(() => {
    return listIngredients.type !== 'bun' && countIngredient !== 0;
  }, [listIngredients, countIngredient]);

  const opacity = isDragging ? 0 : 1;

  return (
    <div ref={drag} style={{ opacity }} className={`${styles.list} pb-8 pr-6 `}>
      {countIngredients ? (
        <Counter count={countIngredient} size='default' extraClass='m-1 mr-5' />
      ) : countBuns ? (
        <Counter count={1} size='default' extraClass='m-1 mr-5' />
      ) : (
        ''
      )}

      <img
        src={image}
        alt={name}
        onClick={openModal}
        className={styles.image}
        key={key}
      />
      <div className={`${styles.box} pt-2`}>
        <p className={'text text_type_digits-default pr-1'}>{price}</p>
        <CurrencyIcon type='primary' />
      </div>
      <p className={`${styles.container} pt-2 text text_type_main-default`}>
        {name}
      </p>
      {showModal && (
        <Modal onClose={closeModal}>
          <IngredientDetails listIngredients={listIngredients} />
        </Modal>
      )}
    </div>
  );
};

IngredientsList.propTypes = {
  listIngredients: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }),
};
