import PropTypes from 'prop-types';
import styles from './modal.module.css';
import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalOverlay } from './modal-overlay/modal-overlay';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const modal = document.getElementById('modal');

export const Modal = ({ onClose, children }) => {
  const modalClick = (evt) => {
    evt.stopPropagation();
  };

  useEffect(() => {
    const closeEsc = (evt) => {
      if (evt.key === 'Escape') {
        onClose();
      }
    };
    document.addEventListener('keydown', closeEsc);
    return () => document.removeEventListener('keydown', closeEsc);
  }, [onClose]);

  return createPortal(
    <>
      <div className={styles.modal} onClick={modalClick}>
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

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func,
};
