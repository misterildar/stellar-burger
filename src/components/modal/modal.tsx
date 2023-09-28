import styles from './modal.module.css';
import React, { useEffect, FC, ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from './modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modal = document.getElementById('modal') as HTMLElement;

interface IModal {
  onClose?: any;
  children?: ReactNode;
}

export const Modal: FC<IModal> = ({ onClose, children }) => {
  useEffect(() => {
    const closeEsc = (evt: { key: string }) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', closeEsc);
    return () => document.removeEventListener('keydown', closeEsc);
  }, [onClose]);

  return createPortal(
    <>
      <div className={styles.modal} onClick={(evt) => evt.stopPropagation()}>
        <button className={`${styles.button} pt-15`} onClick={onClose}>
          {onClose && <CloseIcon type='primary' />}
        </button>
        {children}
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modal
  );
};
