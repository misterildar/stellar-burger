import React from 'react';
import styles from './ingredients-box.module.css';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { DELETE_INGREDIENT } from '../../services/actions/burgerConstructorReducer';

const IngredientsBox = ({ el }) => {
  const dispatch = useDispatch();
  return (
    <div key={el._id} className={styles.element}>
      <DragIcon type="primary" />
      <ConstructorElement
        text={el.name}
        price={el.price}
        thumbnail={el.image}
        handleClose={() => dispatch({ type: DELETE_INGREDIENT })}
      />
    </div>
  );
};

export default IngredientsBox;
