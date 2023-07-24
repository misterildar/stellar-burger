import React, { useEffect, useMemo, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { IngredientsContainer } from '../ingredients-container/ingredients-container';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getIngredients } from '../../services/actions/burgerIngredientsReducer';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useInView } from 'react-intersection-observer';

export const BurgerIngredients = () => {
  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients
  );

  const [bunsRef, bunsInView] = useInView({ threshold: 0 });

  const [saucesRef, saucesInView] = useInView({ threshold: 0.8 });

  const [mainsRef, mainsInView] = useInView({ threshold: 0.3 });

  const [current, setCurrent] = useState();

  useEffect(() => {
    if (bunsInView) {
      setCurrent('bun');
    }
    if (saucesInView) {
      setCurrent('sauce');
    }
    if (mainsInView) {
      setCurrent('main');
    }
  }, [bunsInView, saucesInView, mainsInView]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const buns = useMemo(
    () => ingredients.filter((el) => el.type === 'bun'),
    [ingredients]
  );

  const sauces = useMemo(
    () => ingredients.filter((el) => el.type === 'sauce'),
    [ingredients]
  );

  const mains = useMemo(
    () => ingredients.filter((el) => el.type === 'main'),
    [ingredients]
  );

  return (
    <section className={'pl-25'}>
      <h1 className="text text_type_main-large pt-8 pb-5">Соберите бургер</h1>
      <div style={{ display: 'flex' }}>
        <Tab value="bun" active={current === 'bun'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="sauce" active={current === 'sauce'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="main" active={current === 'main'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.container} custom-scroll`}>
        <IngredientsContainer
          id="bun"
          title="Булки"
          ingredients={buns}
          ref={bunsRef}
        />
        <IngredientsContainer
          id="sauce"
          title="Соусы"
          ingredients={sauces}
          ref={saucesRef}
        />

        <IngredientsContainer
          id="main"
          title="Начинки"
          ingredients={mains}
          ref={mainsRef}
        />
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired),
};
