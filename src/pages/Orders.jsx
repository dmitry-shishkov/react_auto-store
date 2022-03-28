import React from "react";
import axios from "axios";

import { AppContext } from "../context";

import { Card } from "../components/Card/Card";
import { Load } from "../components/Load/Load";

export function Orders() {

  const { loading } = React.useContext(AppContext);

  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("https://6175779d08834f0017c70c1b.mockapi.io/orders");
        setOrders(data.reduce((prev, obj) => [...prev, ...obj.items], []));
      } catch (error) {
        alert("Ошибка при запросе заказов");
        console.error(error);
      }
    })();
  }, []);

  return (
    <div className="content">

      <div className="mainBlock">
        <h1>Мои заказы</h1>
      </div>

      {loading
        ? <Load />
        : <div className="cards">
          {orders.map((item, index) => (
            <Card
              key={index}
              id={item.id}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
            />
          ))}
        </div>}

    </div>
  );
}