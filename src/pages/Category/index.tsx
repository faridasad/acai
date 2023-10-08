// React and Hooks
import React from "react";
import { useLocation } from "react-router-dom";
import useBasketStore from "../../store/BasketStore";

// Components and Styles
import Search from "../../components/Search";
import CategoryData from "../../data/categories.json";
import Error from "../Error";
import "./category.scss";

// Assets
import MinusIcon from "../../assets/images/icon-minus.svg";
import PlusIcon from "../../assets/images/icon-plus.svg";
import MessageIcon from "../../assets/images/icon-message.svg";

interface CategoryProps {}

const Category: React.FC<CategoryProps> = () => {
  const { pathname } = useLocation();
  const path = pathname.split("/")[1];
  const categories: { [key: string]: typeof CategoryData.categories.salads } =
    CategoryData.categories;

  if (!categories.hasOwnProperty(path)) return <Error />;

  const categoryItems = categories[path].items;

  // Zustand State
  const [basket, setBasket] = useBasketStore((state) => [
    state.basket,
    state.setBasket,
  ]);

  console.log(basket)

  return (
    <div className="container">
      <Search />
      <section className="category">
        <ul role="list" className="category-list">
          {categoryItems.map((item, idx) => {
            
            return (
              <li className="category-list__item" key={idx}>
                <img
                  src={item.img_url}
                  alt={item.name}
                  className="item-image"
                />
                <div className="details">
                  <button className="add-notes">
                    <img src={MessageIcon} alt="Add note" />
                  </button>
                  <span className="name">{item.name}</span>
                  <span className="ingredients">
                    <p>
                      {item.ingredients.map((i, idx: number) => (
                        <React.Fragment key={idx}>
                          {idx > 0 && ", "}

                          {i}
                        </React.Fragment>
                      ))}
                    </p>
                  </span>
                  <span className="price">AZN {item.price.toFixed(2)}</span>
                  <div className="controls">
                    <div className="controls__quantity">
                      <button className="decrease-button">
                        <img src={MinusIcon} alt="Decrease" />
                      </button>
                      <span className="quantity">0</span>
                      <button className="increase-button">
                        <img src={PlusIcon} alt="Increase" />
                      </button>
                    </div>
                    <div className="add-button">
                      <span>Boşqaba əlavə et</span>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default Category;
