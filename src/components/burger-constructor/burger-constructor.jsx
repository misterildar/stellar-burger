import React, { useContext, useMemo } from 'react';
import styles from './burger-constructor.module.css';
import {
  CurrencyIcon,
  DragIcon,
  DeleteIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';

import { CreateOrder } from '../create-order/create-order';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import { IngredientsContext } from '../../services/ingredientsContext';
import { InitialIngredientsContext } from '../../services/ingredientsContext';

export const BurgerConstructor = () => {
  const { ingredientBurgerState, ingredientBurgerDispatch } = useContext(
    InitialIngredientsContext
  );

  console.log(ingredientBurgerState.ingredientBurger);
  console.log(ingredientBurgerState.bun);

  const bun = ingredientBurgerState.bun;

  const saucesAndMains = useMemo(
    () =>
      ingredientBurgerState.ingredientBurger.filter((el) => el.type !== 'bun'),
    [ingredientBurgerState]
  );

  const sum = useMemo(() => {
    const sumIngredient = saucesAndMains.reduce(
      (acc, price) => acc + price.price,
      0
    );
    const sumBun = bun ? bun.price * 2 : 0;
    return sumIngredient + sumBun;
  }, [ingredientBurgerState]);

  return (
    <section className={styles.section}>
      <div className={styles.box}>
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
          {/* {!bun ||
            (!saucesAndMains && (
              <p className="text text_type_main-medium">
                Добавьте сюда булку и ингедиенты для создания заказа
              </p>
            ))} */}
        </div>

        {bun && (
          <ConstructorElement
            type="bottom"
            isLocked={true}
            text={`${bun.name} (верх)`}
            price={bun.price}
            thumbnail={bun.image}
          />
        )}
      </div>
      <CreateOrder sum={sum} />
    </section>
  );
};

// BurgerConstructor.propTypes = {
//   ingredients: PropTypes.arrayOf(ingredientPropType.isRequired).isRequired,
// };
