import React from 'react';
import {
  BurgerIcon,
  ListIcon,
  Logo,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import { AppHeaderItem } from './app-header-item/app-header-item';
import { Link, useMatch } from 'react-router-dom';
import Styles from './app-header.module.css';

export const AppHeader = () => {
  const isConstructor = useMatch('/');
  const isFeed = useMatch('/feed');
  const isProfile = useMatch('/profile-nav/*');

  return (
    <header className={Styles.header}>
      <div className={Styles.box}>
        <AppHeaderItem title='Конструктор' link='/'>
          <BurgerIcon type={isConstructor ? 'primary' : 'secondary'} />
        </AppHeaderItem>
        <AppHeaderItem title='Лента заказов' link='/feed'>
          <ListIcon type={isFeed ? 'primary' : 'secondary'} />
        </AppHeaderItem>
      </div>
      <Link to='/' className={Styles.logo}>
        <Logo />
      </Link>
      <AppHeaderItem title='Личный кабинет' link='/profile-nav'>
        <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
      </AppHeaderItem>
    </header>
  );
};
