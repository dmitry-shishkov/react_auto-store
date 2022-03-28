import React from "react";
import axios from "axios";

import { Info } from "../../pages/Info";
import { useCart } from "../../hooks/useCart";

import styles from "./Cart.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export function Cart({ onClose, onRemove, items = [] }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);

  const onClickOrder = async () => {
    try {
      const { data } = await axios.post("https://6175779d08834f0017c70c1b.mockapi.io/orders", {
        items: cartItems,
      });
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete("https://6175779d08834f0017c70c1b.mockapi.io/cart/" + item.id);
        await delay(1000);
      }
    } catch (error) {
      alert("Ошибка при создании заказа");
    }
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.cart}>
        <div className={styles.cartTitle}>
          <h2>Корзина</h2>
          <img
            className={styles.btnCloseBasket}
            src="/img/btn_remove.svg"
            alt="Закрыть"
            onClick={onClose}
          />
        </div>

        {
          items.length > 0 ? (
            <>
              <div className={styles.items}>
                {items.map((obj) => (
                  <div key={obj.id} className={styles.cartItem}>
                    <img src={obj.imageUrl} alt="Автозапчасть" />
                    <div className={styles.description} >
                      <p>{obj.title}</p>
                      <b>{obj.price} руб.</b>
                    </div>
                    <img
                      className={styles.btnRemove}
                      src="/img/btn_remove.svg"
                      alt="Удалить"
                      onClick={() => onRemove(obj.id)}
                    />
                  </div>
                ))}
              </div>
              <div className={styles.totalBlock}>
                <div className={styles.total}>
                  <span>Итого:</span>
                  <div></div>
                  <b>{totalPrice} руб.</b>
                </div>
                <button className={styles.greenButton} onClick={onClickOrder}>
                  Оформить заказ
                  <img src="/img/arrow.svg" alt="Стрелка" />
                </button>
              </div>
            </>
          ) : (
            <Info
              title={isOrderComplete ? "Заказ оформлен" : "Корзина пустая"}
              description={
                isOrderComplete
                  ? `Ваш заказ #${orderId} оформлен и скоро будет передан курьерсокй доставке`
                  : "Добавьте хотя бы один товар, чтобы сделать заказ"}
              image={isOrderComplete ? "/img/order.png" : "/img/box.png"}
            />
          )
        }
      </div>
    </div>
  );
}