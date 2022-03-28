import React from "react";
import { Card } from "../components/Card/Card";
import { Load } from "../components/Load/Load";
import { Pagination } from "../components/Pagination/Pagination";

export function Home({
  items,
  loading,
  searchValue,
  setSearchValue,
  onChangeSearchInput,
  onAddToFavorites,
  onAddToCart,
}) {

  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage] = React.useState(8);

  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItem = items.slice(firstItemIndex, lastItemIndex);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  const renderPages = () => {
    return currentItem
      .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
      .map((item, index) => (
        <Card
          key={index}
          onFavorite={(obj) => onAddToFavorites(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          {...item}
        />
      ));
  }

  const searchItems = () => {
    return items
      .filter(item => item.title.toLowerCase().includes(searchValue.toLowerCase()))
      .map((item, index) => (
        <Card
          key={index}
          onFavorite={(obj) => onAddToFavorites(obj)}
          onPlus={(obj) => onAddToCart(obj)}
          {...item}
        />
      ));
  }

  const renderItems = (searchValue) => {
    return searchValue
      ? <>{searchItems()}</>
      : <>{renderPages()}</>
  }

  return (
    <div className="content">

      <div className="mainBlock">
        <p>{searchValue ? `Поиск по запросу: "${searchValue}"` : "Все запчасти тут"}</p>
        <div className="searchBlock">
          <img className="iconSearch" src="/img/search.svg" alt="Поиск" />
          {searchValue && <img
            className="btnClear"
            src="/img/btn_remove.svg"
            alt="Очистить"
            onClick={() => setSearchValue("")}
          />}
          <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск" />
        </div>
      </div>

      {loading
        ? <Load />
        : <div className="cards">
          {renderItems(searchValue)}
        </div>
      }
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={items.length}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
}
