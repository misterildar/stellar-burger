import React from 'react';
import PropTypes from 'prop-types';
import { Card } from '../card/card';
import styles from './ingredients-container.module.css';

export const IngredientsContainer = React.forwardRef((props, ref) => {
  return (
    <div>
      <h2
        className={`${styles.container} text_type_main-medium pt-4 `}
        id={props.id}
      >
        {props.title}
      </h2>
      <div ref={ref} className={`${styles.box} pl-8`}>
        {props.ingredients.map((el) => (
          <Card listIngredients={el} key={el._id} />
        ))}
      </div>
    </div>
  );
});

IngredientsContainer.propTypes = {
  props: PropTypes.object,
};
