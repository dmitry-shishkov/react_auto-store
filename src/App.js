import React from "react";
import axios from "axios";
import { Route } from "react-router";

import { AppContext } from "./context";

import { Cart } from "./components/Cart/Cart";
import { Header } from "./components/Header/Header";

import { Home } from "./pages/Home";
import { Orders } from "./pages/Orders";
import { Favorites } from "./pages/Favorites";

export function App() {
  const [loading, setLoading] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [favorites, setFavorites] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartOpened, setCartOpened] = React.useState(false);


  React.useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const cartResponse = await axios.get("https://6175779d08834f0017c70c1b.mockapi.io/cart");
        const favoriteResponse = await axios.get("https://6175779d08834f0017c70c1b.mockapi.io/favorites");
        const itemsResponse = await axios.get("https://6175779d08834f0017c70c1b.mockapi.io/items");

        setCartItems(cartResponse.data);
        setFavorites(favoriteResponse.data);
        setItems(itemsResponse.data);
        setLoading(false);
      } catch (error) {
        alert("Ошибка при загрузке данных");
        console.error(error);
      }
    }
    fetchData();
  }, []);


  const onAddToCart = async (obj) => {
    try {
      const findItem = cartItems.find(item => Number(item.parentId) === Number(obj.id))
      if (findItem) {
        setCartItems(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://6175779d08834f0017c70c1b.mockapi.io/cart/${findItem.id}`);
      } else {
        setCartItems(prev => [...prev, obj]);
        const { data } = await axios.post("https://6175779d08834f0017c70c1b.mockapi.io/cart", obj);
        setCartItems(prev =>
          prev.map(item => {
            if (item.parentId === data.parentId) {
              return {
                ...item,
                id: data.id
              };
            }
            return item;
          }));
      }
    } catch (error) {
      alert("Ошибка добавления товара в корзину");
      console.error(error);
    }
  };

  const onRemoveItem = (id) => {
    try {
      axios.delete(`https://6175779d08834f0017c70c1b.mockapi.io/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      alert("Ошибка удаления из корзины");
      console.error(error);
    }
  };

  const onAddToFavorites = async (obj) => {
    try {
      const findItem = favorites.find(item => Number(item.parentId) === Number(obj.id))
      if (findItem) {
        setFavorites(prev => prev.filter(item => Number(item.parentId) !== Number(obj.id)));
        await axios.delete(`https://6175779d08834f0017c70c1b.mockapi.io/favorites/${findItem.id}`);
      } else {
        setFavorites(prev => [...prev, obj]);
        await axios.post("https://6175779d08834f0017c70c1b.mockapi.io/favorites", obj);
      }
    } catch (error) {
      alert("Ошибка добавления товара в избранное");
      console.error(error);
    }
  };

  const onRemoveFavorites = async (obj) => {
    try {
      setFavorites(prev => prev.filter(item => item.id !== obj.id));
      await axios.delete(`https://6175779d08834f0017c70c1b.mockapi.io/favorites/${obj.id}`);
    } catch (error) {
      alert("Ошибка удаления из избранного");
      console.error(error);
    }
  };

  const onChangeSearchInput = (event) => {
    setSearchValue(event.target.value);
  };

  const isItemAdded = (id) => {
    return cartItems.some(obj => Number(obj.parentId) === Number(id));
  }

  const isFavoritesAdded = (id) => {
    return favorites.some(obj => Number(obj.parentId) === Number(id));
  }

  return (
    <AppContext.Provider value={{
      items,
      loading,
      cartItems,
      favorites,
      isItemAdded,
      isFavoritesAdded,
      onAddToFavorites,
      setCartOpened,
      setCartItems
    }}>
      <div className="wrapper">

        {cartOpened &&
          (<Cart items={cartItems} onClose={() => setCartOpened(false)} onRemove={onRemoveItem} />
          )}

        <Header onClickCart={() => setCartOpened(true)} />

        <Route exact path="/">
          <Home
            items={items}
            loading={loading}
            cartItems={cartItems}
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            onChangeSearchInput={onChangeSearchInput}
            onAddToFavorites={onAddToFavorites}
            onAddToCart={onAddToCart}
          />
        </Route>

        <Route exact path="/favorites">
          <Favorites onRemoveFavorites={onRemoveFavorites} />
        </Route>

        <Route exact path="/orders">
          <Orders />
        </Route>

      </div>
    </AppContext.Provider>
  );
}