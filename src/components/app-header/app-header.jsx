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
import { routes } from '../../utils/constants';

export const AppHeader = () => {
  const isConstructor = useMatch(routes.home);
  const isFeed = useMatch(routes.feed);
  const isProfile = useMatch(routes.profile);

  return (
    <header className={Styles.header}>
      <div className={Styles.box}>
        <AppHeaderItem title='Конструктор' link={routes.home}>
          <BurgerIcon type={isConstructor ? 'primary' : 'secondary'} />
        </AppHeaderItem>
        <AppHeaderItem title='Лента заказов' link={routes.feed}>
          <ListIcon type={isFeed ? 'primary' : 'secondary'} />
        </AppHeaderItem>
      </div>
      <Link to={routes.home} className={Styles.logo}>
        <Logo />
      </Link>
      <AppHeaderItem title='Личный кабинет' link={routes.profile}>
        <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
      </AppHeaderItem>
    </header>
  );
};
