import React, { FC } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './app-header-item.module.css';
import { TAppHeaderItem } from '../../../utils/types';

export const AppHeaderItem: FC<TAppHeaderItem> = ({
  title,
  children,
  link,
}) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) => (isActive ? styles.active : styles.inactive)}
    >
      {children}
      <p className='text text_type_main-default pl-2'>{title}</p>
    </NavLink>
  );
};
