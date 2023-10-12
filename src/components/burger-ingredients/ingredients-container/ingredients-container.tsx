import React, { FC, Ref } from 'react';
import { Card } from '../card/card';
import styles from './ingredients-container.module.css';
import { TIngredient } from '../../../utils/types';

interface IContainer {
  id: string;
  title: string;
  ref: Ref<HTMLDivElement>;
  ingredients: TIngredient[];
}

export const IngredientsContainer: FC<IContainer> = React.forwardRef(
  (props, ref) => {
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
  }
);
