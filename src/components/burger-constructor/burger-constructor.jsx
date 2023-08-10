import React, { useCallback } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CreateOrder } from '../create-order/create-order';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import IngredientsBox from '../ingredients-box/Ingredients-box';
import {
  getBurgerConstructor,
  getMoveIngredientsState,
  bunFind,
  saucesAndMainsFind,
  orderIngredientIdFind,
  totalPriceFind,
} from '../../services/store/constructorSlice';
import {
  addBurgerIngredients,
  moveIngredient,
} from '../../services/store/constructorSlice';

export const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const bun = useSelector(bunFind);

  const saucesAndMains = useSelector(saucesAndMainsFind);

  const orderIngredientId = useSelector(orderIngredientIdFind);

  const totalPrice = useSelector(totalPriceFind);

  const ingredientBurgerState = useSelector(getBurgerConstructor);

  const moveIngredientsState = useSelector(getMoveIngredientsState);

  const [{ isHover }, drop] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch(addBurgerIngredients(item));
    },
  });

  const moveListItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = moveIngredientsState[dragIndex];
      const hoverItem = moveIngredientsState[hoverIndex];
      const updateIngredients = [...moveIngredientsState];
      updateIngredients[dragIndex] = hoverItem;
      updateIngredients[hoverIndex] = dragItem;

      dispatch(moveIngredient(updateIngredients));
    },
    [ingredientBurgerState]
  );

  return (
    <section className={styles.section}>
      <div className={isHover ? styles.border : ''}>
        <div ref={drop} className={styles.box}>
          {bun && (
            <ConstructorElement
              type='top'
              isLocked={true}
              text={`${bun.name} (верх)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}

          <div className={`${styles.container} custom-scroll`}>
            {saucesAndMains.map((el, index) => (
              <IngredientsBox
                el={el}
                key={el.uuid}
                index={index}
                moveListItem={moveListItem}
              />
            ))}

            {!bun && (
              <h2 className='text text_type_main-large  pt-30'>
                &larr; Перенеси сюда&nbsp;булку и&nbsp;она окажется здесь.
              </h2>
            )}
            {bun && !saucesAndMains.length && (
              <p className='text text_type_main-medium pl-10 pt-30'>
                А теперь выбери соусы и начинки.
              </p>
            )}
          </div>

          {bun && (
            <ConstructorElement
              type='bottom'
              isLocked={true}
              text={`${bun.name} (низ)`}
              price={bun.price}
              thumbnail={bun.image}
            />
          )}
        </div>
      </div>
      <CreateOrder
        totalPrice={totalPrice}
        orderIngredientId={orderIngredientId}
      />
    </section>
  );
};

BurgerConstructor.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired),
};
