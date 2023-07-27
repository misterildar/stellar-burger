import React, { useCallback, useMemo, useState } from 'react';
import styles from './burger-constructor.module.css';
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import { CreateOrder } from '../create-order/create-order';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import {
  ADD_BURGER_INGREDIENTS,
  MOVE_INGREDIENT,
} from '../../services/actions/burgerConstructor';
import IngredientsBox from '../ingredients-box/Ingredients-box';
import { v4 as uuidv4 } from 'uuid';

const getBurgerConstructor = (state) => state.burgerConstructor;
const getMoveIngredientsState = (state) =>
  state.burgerConstructor.ingredientBurger;

export const BurgerConstructor = () => {
  const dispatch = useDispatch();

  const ingredientBurgerState = useSelector(getBurgerConstructor);

  const moveIngredientsState = useSelector(getMoveIngredientsState);
  const orderIngredientId = useMemo(() => {
    const ingredientId = [];

    ingredientBurgerState.ingredientBurger.forEach((el) =>
      ingredientId.push(el._id)
    );
    if (ingredientBurgerState.bun) {
      ingredientId.push(ingredientBurgerState.bun._id);
    }
    return ingredientId;
  }, [ingredientBurgerState]);

  const bun = useMemo(() => ingredientBurgerState.bun, [ingredientBurgerState]);

  const saucesAndMains = useMemo(
    () =>
      ingredientBurgerState.ingredientBurger.filter((el) => el.type !== 'bun'),
    [ingredientBurgerState]
  );
  const totalPrice = useMemo(() => {
    const sumIngredient = saucesAndMains.reduce(
      (acc, price) => acc + price.price,
      0
    );
    const sumBun = bun ? bun.price * 2 : 0;
    return sumIngredient + sumBun;
  }, [ingredientBurgerState]);

  const [{ isHover }, drop] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      dispatch({
        type: ADD_BURGER_INGREDIENTS,
        uuid: uuidv4(),
        payload: item,
      });
    },
  });

  const moveListItem = useCallback(
    (dragIndex, hoverIndex) => {
      const dragItem = moveIngredientsState[dragIndex];
      const hoverItem = moveIngredientsState[hoverIndex];
      const updateIngredients = [...moveIngredientsState];
      updateIngredients[dragIndex] = hoverItem;
      updateIngredients[hoverIndex] = dragItem;

      dispatch({ type: MOVE_INGREDIENT, payload: updateIngredients });
    },
    [ingredientBurgerState]
  );

  return (
    <section className={styles.section}>
      <div className={isHover ? styles.border : ''}>
        <div ref={drop} className={styles.box}>
          {bun && (
            <ConstructorElement
              type="top"
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
              <h2 className="text text_type_main-large  pt-30">
                &larr; Перенеси сюда&nbsp;булку и&nbsp;она окажется здесь.
              </h2>
            )}
            {bun && !saucesAndMains.length && (
              <p className="text text_type_main-medium pl-10 pt-30">
                А теперь выбери соусы и начинки.
              </p>
            )}
          </div>

          {bun && (
            <ConstructorElement
              type="bottom"
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
