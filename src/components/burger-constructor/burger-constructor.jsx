import React, { useMemo } from 'react';
import styles from './burger-constructor.module.css';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { CreateOrder } from '../create-order/create-order';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import { useSelector } from 'react-redux';
export const BurgerConstructor = () => {
  const ingredientBurgerState = useSelector((state) => state.burgerConstructor);

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
          {!bun && (
            <h2 className="text text_type_main-large  pt-30">
              &larr; Нажми на&nbsp;булку и&nbsp;она окажется здесь.
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
