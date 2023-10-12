import React, { FC } from 'react';
import styles from './modal-overlay.module.css';
import { TonClose } from '../../../utils/types';

export const ModalOverlay: FC<TonClose> = ({ onClose }) => {
  return <div className={styles.overlay} onClick={onClose}></div>;
};
