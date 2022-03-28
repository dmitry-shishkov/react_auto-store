import React from "react";
import { Card } from "../components/Card/Card";
import { Load } from "../components/Load/Load";
import { AppContext } from "../context";

export function Favorites({ onRemoveFavorites }) {

  const { favorites, loading } = React.useContext(AppContext);

  return (
    <div className="content">

      <div className="mainBlock">
        <h1>Мои закладки</h1>
      </div>

      {loading
        ? <Load />
        : <div className="cards">
          {favorites.map((item, index) => (
            <Card
              key={index}
              id={item.id}
              parentId={item.parentId}
              title={item.title}
              price={item.price}
              imageUrl={item.imageUrl}
              onFavoriteFavorite={onRemoveFavorites}
            />
          ))}
        </div>}

    </div>
  );
}