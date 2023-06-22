import React from 'react';
import styles from './ingredients-list.module.css';

export const IngredientList = ({ listIngredients }) => {
  const { image, name } = listIngredients;

  return (
    <div>
      <div>
        <img src={image} alt={name} />
        <p className="text text_type_main-default">{name}</p>
      </div>
    </div>
  );
};
