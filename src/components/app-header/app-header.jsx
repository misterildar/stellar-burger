import React from 'react';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Styles from './app-header.module.css';
import { AppHeaderItem } from '../app-header-item/app-header-item';

export const AppHeader = () => {
  return (
    <header className={Styles.header}>
      <div className={Styles.box}>
        <AppHeaderItem title="Конструктор" inactive={false}>
          <BurgerIcon type="primary" />
        </AppHeaderItem>
        <AppHeaderItem title="Лента заказов">
          <ListIcon type="secondary" />
        </AppHeaderItem>
      </div>
      <div className={Styles.logo}>
        <Logo />
      </div>
      <AppHeaderItem title="Личный кабинет">
        <ProfileIcon type="secondary" />
      </AppHeaderItem>
    </header>
  );
};
