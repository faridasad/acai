import React, { LiHTMLAttributes, forwardRef, useState } from "react";

import "./category-list-item.scss";

// Assets
import MinusIcon from "../../assets/images/icon-minus.svg";
import PlusIcon from "../../assets/images/icon-plus.svg";
import MessageIcon from "../../assets/images/icon-message.svg";
import useCartStore from "../../store/CartStore";
import { SelectedProduct } from "../../pages/Category";

interface ListItemProps {
  isInModal: boolean;
  item: {
    id: number;
    name: string;
    img_url: string;
    price: number;
    ingredients: string[];
  };
  setSelectedProducts: React.Dispatch<React.SetStateAction<SelectedProduct[]>>;
  selectedProducts: SelectedProduct[];
}

interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {}

const CategoryListItem = forwardRef<HTMLLIElement, ListItemProps>(({ item, isInModal, setSelectedProducts, selectedProducts, ...props }, ref) => {


    const addToCart = useCartStore((state) => state.addToCart);

    const product = selectedProducts.find(p => p.id === item.id);
    const productQuantity = product?.quantity || 0;

    const handleCartUpdate = () => {
      const product = {
        id: item.id,
        name: item.name,
        price: item.price,
        imgUrl: item.img_url,
        ingredients: item.ingredients,
      };

      if(productQuantity === 0 || productQuantity === undefined) return;

      addToCart(product, productQuantity);

      const updatedProducts = selectedProducts.filter(
        (p: any) => p.id !== item.id
      );
      setSelectedProducts(updatedProducts);
    };

    const increaseSelectedProductQuantity = (_id: number) => {
      const product = selectedProducts.find((p: any) => p.id === _id);

      if (!product) {
        const updatedProduct = { id: _id, quantity: 1 };
        setSelectedProducts([...selectedProducts, updatedProduct]);
        return;
      }

      const updatedProducts = selectedProducts.map((p: any) =>
        p.id === _id ? { id: p.id, quantity: p.quantity + 1 } : p
      );

      setSelectedProducts(updatedProducts);
    };

    const decreaseSelectedProductQuantity = (_id: number) => {
      const product = selectedProducts.find((p: any) => p.id === _id)

      if(!product || product.quantity === 0) return;

      const updatedProducts = selectedProducts.map((p: any) =>
        p.id === _id ? { id: p.id, quantity: p.quantity - 1 } : p
      );

      setSelectedProducts(updatedProducts)
    }

    return (
      <li
        className={`category-list__item${isInModal ? " inModal" : ""}`}
        ref={ref}
        {...props}
      >
        <img src={item.img_url} alt={item.name} className="item-image" />
        <div className="details">
          {!isInModal && (
            <div role="button" tabIndex={0} className="add-notes">
              <img src={MessageIcon} alt="Add note" />
            </div>
          )}
          <div className="info">
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
            {isInModal ? (
              <div className="price-notes">
                <span className="price">AZN {item.price.toFixed(2)}</span>
                <div role="button" tabIndex={0} className="add-notes">
                  <img src={MessageIcon} alt="Add note" />
                  <span>Mətbəxə şərh əlavə edin</span>
                </div>
              </div>
            ) : (
              <span className="price">AZN {item.price.toFixed(2)}</span>
            )}
          </div>
          <div className="controls">
            <div className="controls__quantity">
              <div
                role="button"
                tabIndex={0}
                className="decrease-button"
                aria-disabled={productQuantity === 0}
                onClick={(e) => {
                  e.stopPropagation();
                  productQuantity !== 0 &&
                    decreaseSelectedProductQuantity(item.id)
                }}
              >
                <img src={MinusIcon} alt="Decrease" />
              </div>
              <span className="quantity">
                {selectedProducts.find((p: any) => p.id === item.id)
                  ?.quantity || 0}
              </span>
              <div
                role="button"
                tabIndex={0}
                className="increase-button"
                onClick={(e) => {
                  e.stopPropagation();
                  increaseSelectedProductQuantity(item.id);
                }}
              >
                <img src={PlusIcon} alt="Increase" />
              </div>
            </div>
            <div
              role="button"
              tabIndex={0}
              className="add-button"
              onClick={(e) => {
                e.stopPropagation();
                handleCartUpdate();
              }}
            >
              <span>Boşqaba əlavə et</span>
            </div>
          </div>
        </div>
      </li>
    );
  }
);

export default CategoryListItem;
