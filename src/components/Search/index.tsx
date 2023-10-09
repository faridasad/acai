// Components and styles
import "./search.scss";
import SearchIcon from "../../assets/images/icon-search.svg";
import CloseIcon from "../../assets/images/icon-close.svg";

import React, { useState } from "react";

import { useNavigate } from "react-router-dom";
import useCartStore from "../../store/CartStore";


interface SearchProps {
  setQuery: any;
}

const Search: React.FC<SearchProps> = ({setQuery}) => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);
  const navigate = useNavigate();

  const cart = useCartStore(state => state.cart)

  return (
    <section className={"search" + (isSearchBarOpen === true ? " active" : "")}>
      <button className="search__button">
        <img
          src={SearchIcon}
          alt="Search"
          onClick={() => {
            setIsSearchBarOpen(true);
          }}
        />
        <div className="search__bar">
          <input
            type="text"
            placeholder="Kateqoriya axtar..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <img
            src={CloseIcon}
            alt="Close"
            onClick={() => {
              setIsSearchBarOpen(false);
            }}
          />
        </div>
      </button>
      <button className="orders-button" onClick={() => {
        navigate("/cart")
      }}>Sifarişləriniz
        <span className="count-indicator">{cart.length}</span>
      </button>
    </section>
  );
};

export default Search;
