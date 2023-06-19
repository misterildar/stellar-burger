import React from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import styles from './app-header.module.css'
import { AppHeaderContainer } from './app-header-container';

export function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.header__box}>
        <AppHeaderContainer style={styles.header_color} text={"Конструктор"} logo={<BurgerIcon />} />
        <AppHeaderContainer text={"Лента заказов"} logo={<ListIcon />} />
      </div>
      <AppHeaderContainer logo={<Logo />} />
      <AppHeaderContainer text={"Личный кабинет"} logo={<ProfileIcon />} />
    </header>
  )
}