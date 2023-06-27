import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export const ModalOverlay = ({ children, onClose }) => {
  return (
    <div className={styles.overlay} onClick={onClose}>
      {children}
    </div>
  );
};

ModalOverlay.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func,
};
