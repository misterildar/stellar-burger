import React from 'react';
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

export const ModalOverlay = ({ onClose }) => {
  return <div className={styles.overlay} onClick={onClose}></div>;
};

ModalOverlay.propTypes = {
  onClose: PropTypes.func,
};
