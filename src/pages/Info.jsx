import React from "react";
import { AppContext } from "../context";

import styles from "../components/Cart/Cart.module.scss";

export const Info = ({ image, title, description }) => {

  const { setCartOpened } = React.useContext(AppContext);

  return (
    <div className={styles.info}>
      <img src={image} alt="Картинка" />
      <h2>{title}</h2>
      <p>{description}</p>
      <button className={`${styles.greenButton} ${styles.greenButtonArrow}`} onClick={() => setCartOpened(false)}>
        Вернуться назад
        <img src="/img/arrow.svg" alt="Стрелка" />
      </button>
    </div>
  );
}
