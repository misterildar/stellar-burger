import React, { useRef, FC } from 'react';
import styles from './ingredients-box.module.css';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { useDispatch } from 'react-redux';
import { useDrop, useDrag } from 'react-dnd';
import { deleteIngredient } from '../../../services/store/constructorSlice';
import { TIngredient } from '../../../utils/types';

interface IIngredientsBox {
  el: TIngredient;
  index: number;
  moveListItem: (dragIndex: number, hoverIndex: number) => void;
}

const IngredientsBox: FC<IIngredientsBox> = ({ el, index, moveListItem }) => {
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
    hover: (item: { [index: string]: number }, monitor: any) => {
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

  const ref: any = useRef(null);

  const dragDropRef: any = dragRef(dropRef(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <div ref={dragDropRef} style={{ opacity }} className={styles.element}>
      <DragIcon type='primary' />
      <ConstructorElement
        text={el.name}
        price={el.price}
        thumbnail={el.image}
        handleClose={() => dispatch(deleteIngredient(index))}
      />
    </div>
  );
};

export default IngredientsBox;
