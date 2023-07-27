import React, { useRef } from 'react';
import styles from './ingredients-box.module.css';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import { DELETE_INGREDIENT } from '../../services/actions/burgerConstructorReducer';

const IngredientsBox = ({ el, index, moveListItem }) => {
  const dispatch = useDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'item',
    hover: (item, monitor) => {
      const dragIndex = item.index;
      const hoverIndex = index;
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return;

      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const ref = useRef(null);
  const dragDropRef = dragRef(dropRef(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <div
      ref={dragDropRef}
      key={index}
      style={{ opacity }}
      className={styles.element}
    >
      <DragIcon type="primary" />
      <ConstructorElement
        text={el.name}
        price={el.price}
        thumbnail={el.image}
        handleClose={() =>
          dispatch({ type: DELETE_INGREDIENT, payload: index })
        }
      />
    </div>
  );
};

export default IngredientsBox;
