import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import styles from './app-header-item.module.css';

const setActive = ({ isActive }) =>
  isActive ? styles.active : styles.inactive;

export const AppHeaderItem = ({ title, children, link }) => {
  return (
    <NavLink to={link} className={setActive}>
      {children}
      <p className='text text_type_main-default pl-2'>{title}</p>
    </NavLink>
  );
};

AppHeaderItem.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  link: PropTypes.string,
};
