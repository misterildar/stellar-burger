import React from 'react';
import styles from './modal.module.css';
import { ModalOverlay } from '../modal-overlay/modal-overlay';
import { OrderDetails } from '../order-details/order-details';
import { createPortal } from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modal = document.getElementById('modal');

export const Modal = ({ onClose, children }) => {
  return createPortal(
    <ModalOverlay onClose={onClose}>
      <div className={styles.modal}>
        <button className={`${styles.button} pt-15`} onClick={onClose}>
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
    </ModalOverlay>,
    modal
  );
};
