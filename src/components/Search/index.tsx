// Components and styles
import "./search.scss";
import SearchIcon from "../../assets/images/icon-search.svg";
import CloseIcon from "../../assets/images/icon-close.svg";

import { useState } from "react";

const Search = () => {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

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
            placeholder="Salat axtar..."
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
      <button className="orders-button">Sifarişləriniz</button>
    </section>
  );
};

export default Search;
