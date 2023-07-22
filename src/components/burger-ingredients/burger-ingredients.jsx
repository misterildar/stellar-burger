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
  const { bunsRef, bunsInView } = useInView({ threshold: 0 });

  const { saucesRef, saucesInView } = useInView({ threshold: 0.5 });

  const { mainsRef, mainsInView } = useInView({ threshold: 0.5 });

  const { ref, inView } = useInView({
    threshold: 0.8,
  });

  // console.log(inView);

  const [current, setCurrent] = useState('one');

  const ingredients = useSelector(
    (state) => state.burgerIngredients.ingredients
  );
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
        <Tab value="one" active={current === 'one'} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === 'two'} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === 'three'} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>
      <div className={`${styles.container} custom-scroll`}>
        <IngredientsContainer
          id="buns"
          title="Булки"
          ingredients={buns}
          ref={bunsRef}
        />
        <IngredientsContainer
          id="sauces"
          title="Соусы"
          ingredients={sauces}
          ref={saucesRef}
        />

        <IngredientsContainer
          id="mains"
          title="Начинки"
          ingredients={mains}
          ref={ref}
        />
      </div>
    </section>
  );
};

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientPropType.isRequired),
};
