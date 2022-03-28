import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../../hooks/useCart";

import styles from "./Header.module.scss";

export function Header(props) {
  const { totalPrice } = useCart();

  return (
    <header className={styles.header}>

      <Link to="/">
        <div className={styles.headerLeft}>
          <img src="/img/logo.jpg" alt="Логотип" />
          <div>
            <h1>Auto Parts Store</h1>
            <p>Магазин автозапчастей</p>
          </div>
        </div>
      </Link>

      <ul className={styles.headerRight}>

        <li className={styles.cart} onClick={props.onClickCart}>
          <img src="/img/basket.svg" alt="Корзина" />
          <span>{totalPrice} руб.</span>
        </li>

        <li className={styles.favorites}>
          <Link to="/favorites">
            <img src="/img/btn_like-active.svg" alt="Избранное" />
          </Link>
        </li>

        <li className={styles.orders}>
          <Link to="/orders">
            <img src="/img/user.svg" alt="Мои заказы" />
          </Link>
        </li>

      </ul>
    </header>
  );
}