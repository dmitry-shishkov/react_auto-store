import React from "react";
import { AppContext } from "../../context";
import styles from "./Card.module.scss";

export function Card({
  id,
  title,
  price,
  imageUrl,
  onFavoriteFavorite,
  onFavorite,
  onPlus,
}) {
  const { isItemAdded, isFavoritesAdded } = React.useContext(AppContext);
  const obj = { id, parentId: id, title, price, imageUrl }

  const onClickPlus = () => {
    onPlus(obj);
  }

  const onClickFavoriteCard = () => {
    onFavorite(obj);
  }

  const onClickFavoriteFavorite = () => {
    onFavoriteFavorite(obj);
  }

  return (
    <div className={styles.card}>
      {onFavoriteFavorite && <div className={styles.favorite}>
        <img
          src="/img/btn_like-active.svg"
          alt="Добавить в избранное"
          title="Добавить в избранное"
          onClick={onClickFavoriteFavorite}
        />
      </div>}
      {onFavorite && <div className={styles.favorite}>
        <img
          src={isFavoritesAdded(id) ? "/img/btn_like-active.svg" : "/img/btn_like-disabled.svg"}
          alt="Добавить в избранное"
          title="Добавить в избранное"
          onClick={onClickFavoriteCard}
        />
      </div>}
      <img className={styles.partImg} src={imageUrl} alt="Автозапчасть" />
      <p className={styles.title}>{title}</p>
      <div className={styles.priceBlock}>
        <div>
          <p>Цена:</p>
          <b>{price} руб.</b>
        </div>
        {onPlus && <img
          className={styles.btnPlus}
          src={(isItemAdded(id)) ? "/img/btn_check.svg" : "/img/btn_plus.svg"}
          alt="Добавить в корзину"
          onClick={onClickPlus}
        />}
      </div>
    </div>
  );
}