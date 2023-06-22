import React from 'react';
import styles from './app-header-item.module.css';

export const AppHeaderItem = ({ title, children, inactive = 'text_color_inactive' }) => {
  return (
    <a className={styles.item} href="#">
      {children}
      <p className={`${'text text_type_main-default'} ${inactive} pl-2`}>{title}</p>
    </a>
  );
};
