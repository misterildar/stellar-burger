import { useDrop, useDrag } from 'react-dnd';
import styles from './ingredients-box.module.css';
import { TIngredient } from '../../../utils/types';
import React, { useRef, FC, LegacyRef } from 'react';
import { useAppDispatch } from '../../../hooks/hooks';
import {
  DragIcon,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { deleteIngredient } from '../../../services/store/constructorSlice';

interface IIngredientsBox {
  el: TIngredient;
  index: number;
  moveListItem: (dragIndex: number, hoverIndex: number) => void;
}

const IngredientsBox: FC<IIngredientsBox> = ({ el, index, moveListItem }) => {
  const dispatch = useAppDispatch();

  const [{ isDragging }, dragRef] = useDrag({
    type: 'item',
    item: { index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, dropRef] = useDrop({
    accept: 'item',
    hover(item: { index: number }, monitor) {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      const rec: HTMLElement = ref.current;
      const hoverBoundingRect = rec?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      moveListItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const ref = useRef<HTMLDivElement>();

  const dragDropRef = dragRef(dropRef(ref)) as LegacyRef<HTMLDivElement>;

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
