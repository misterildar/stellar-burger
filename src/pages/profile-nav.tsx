import React, { FC } from 'react';
import { routes } from '../utils/constants';
import styles from './page-style.module.css';
import { useAppDispatch } from '../hooks/hooks';
import { logOutUser } from '../services/store/userSlice';
import { NavLink, Outlet, useMatch } from 'react-router-dom';

const ProfileNav: FC = () => {
  const dispatch = useAppDispatch();

  const isProfile = useMatch(routes.profile);

  const isOrder = useMatch('/profile-nav/order');

  const logOut = () => {
    dispatch(logOutUser());
  };

  return (
    <div className={styles.container}>
      <nav className={styles.nav}>
        <ul className={styles.box}>
          <li>
            <NavLink
              to={routes.profile}
              className={isProfile ? styles.active : styles.inactive}
            >
              <p className='text text_type_main-medium'>Профиль</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.order}
              className={isOrder ? styles.active : styles.inactive}
            >
              <p className='text text_type_main-medium'>История заказов</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.login}
              onClick={logOut}
              className={styles.inactive}
            >
              <p className='text text_type_main-medium text_color_inactive'>
                Выход
              </p>
            </NavLink>
          </li>
          <li>
            {isProfile ? (
              <p className='text text_type_main-default text_color_inactive pt-10 '>
                В этом разделе вы можете изменить свои персональные данные
              </p>
            ) : (
              ''
            )}
            {isOrder ? (
              <p className='text text_type_main-default text_color_inactive pt-10 '>
                В этом разделе вы можете просмотреть свою историю заказов
              </p>
            ) : (
              ''
            )}
          </li>
        </ul>
      </nav>
      <Outlet />
    </div>
  );
};

export default ProfileNav;
