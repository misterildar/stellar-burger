import React, { useEffect, useState } from 'react';
import styles from './burger-ingredients.module.css';
import { IngredientsContainer } from '../ingredients-container/ingredients-container';
import PropTypes from 'prop-types';
import { ingredientPropType } from '../../utils/prop-types';
import { useSelector } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useInView } from 'react-intersection-observer';
import {
  bunsIngredientsFind,
  saucesIngredientsFind,
  mainsIngredientsFind,
} from '../../services/store/ingredientsSlice';

export const BurgerIngredients = () => {
  const buns = useSelector(bunsIngredientsFind);

  const sauces = useSelector(saucesIngredientsFind);

  const mains = useSelector(mainsIngredientsFind);

  const [bunsRef, bunsInView] = useInView({ threshold: 0 });

  const [saucesRef, saucesInView] = useInView({ threshold: 0.8 });

  const [mainsRef, mainsInView] = useInView({ threshold: 0.3 });

  const [current, setCurrent] = useState('bun');

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

  const scrollIngredients = (tab) => {
    const container = document.getElementById(tab);
    if (container) container.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className={'pl-25'}>
      <h1 className='text text_type_main-large pt-8 pb-5'>Соберите бургер</h1>

      <div style={{ display: 'flex' }}>
        <Tab
          value='bun'
          active={current === 'bun'}
          onClick={() => {
            scrollIngredients('bun');
          }}
        >
          Булки
        </Tab>
        <Tab
          value='sauce'
          active={current === 'sauce'}
          onClick={() => {
            scrollIngredients('sauce');
          }}
        >
          Соусы
        </Tab>
        <Tab
          value='main'
          active={current === 'main'}
          onClick={() => {
            scrollIngredients('main');
          }}
        >
          Начинки
        </Tab>
      </div>
      <div className={`${styles.container} custom-scroll`}>
        <IngredientsContainer
          id='bun'
          title='Булки'
          ingredients={buns}
          ref={bunsRef}
        />
        <IngredientsContainer
          id='sauce'
          title='Соусы'
          ingredients={sauces}
          ref={saucesRef}
        />

        <IngredientsContainer
          id='main'
          title='Начинки'
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
