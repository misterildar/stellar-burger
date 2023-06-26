import React from 'react';
import styles from './modal-overlay.module.css';
import { OrderDetails } from '../order-details/order-details';
import { Modal } from '../modal/modal';

export const ModalOverlay = ({ children }) => {
  return <div className={styles.overlay}>{children}</div>;
};
