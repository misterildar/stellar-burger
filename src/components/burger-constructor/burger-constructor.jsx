import React, { useMemo, useState } from 'react';
import styles from './burger-constructor.module.css';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { CreateOrder } from '../create-order/create-order';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { useDrop } from 'react-dnd';
import { ADD_BURGER_INGREDIENTS } from '../../services/actions/burgerConstructorReducer';

export const BurgerConstructor = () => {
  const ingredientBurgerState = useSelector((state) => state.burgerConstructor);

  const dispatch = useDispatch();

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

  const addBurgerIngredients = (item) => {
    dispatch({ type: ADD_BURGER_INGREDIENTS, payload: item });
  };

  const [{ isHover }, drop] = useDrop({
    accept: 'ingredient',
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item) {
      addBurgerIngredients(item);
    },
  });

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
            {saucesAndMains.map((el) => {
              return (
                <div key={el._id} className={styles.item}>
                  <DragIcon type="primary" />
                  <ConstructorElement
                    text={el.name}
                    price={el.price}
                    thumbnail={el.image}
                  />
                </div>
              );
            })}
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
