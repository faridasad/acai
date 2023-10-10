// React and Hooks
import { LiHTMLAttributes, forwardRef } from "react";
import useCartStore from "../../store/CartStore";

// Components and Pages
// *

// Assets and Styles
import MinusIcon from "../../assets/images/icon-minus.svg";
import PlusIcon from "../../assets/images/icon-plus.svg";
import CloseIcon from "../../assets/images/icon-close.svg";

// Types
interface ListItemProps {
  item: {
    id: number;
    name: string;
    imgUrl: string;
    price: number;
  };
}

interface ListItemProps extends LiHTMLAttributes<HTMLLIElement> {}


const CartListItem = forwardRef<HTMLLIElement, ListItemProps>(({ item, ...props }, ref) => {
    const [cart, addToCart, removeFromCart, decreaseCartProduct] = useCartStore(
      (state) => [
        state.cart,
        state.addToCart,
        state.removeFromCart,
        state.decreaseCartProduct,
      ]
    );

    const cartItem = cart.find((p) => p.id === item.id);

    return (
      <li className={`cart-products-list__item`} ref={ref} {...props}>
        <button
          className="product-remove-icon"
          onClick={() => removeFromCart(item)}
        >
          <img src={CloseIcon} alt="Remove" />
        </button>
        <img src={item.imgUrl} alt={item.name} className="item-image" />
        <div className="details">
          <div className="info">
            <span className="name">{item.name}</span>
            <span className="price">AZN {item.price.toFixed(2)}</span>
          </div>
          <div className="controls">
            <div className="controls__quantity">
              <div
                role="button"
                tabIndex={0}
                className="decrease-button"
                aria-disabled={cartItem?.quantity === 1}
                onClick={(e) => {
                  e.stopPropagation();
                  decreaseCartProduct(item);
                }}
              >
                <img loading="lazy" src={MinusIcon} alt="Decrease" />
              </div>
              <span className="quantity">{cartItem?.quantity}</span>
              <div
                role="button"
                tabIndex={0}
                className="increase-button"
                onClick={(e) => {
                  e.stopPropagation();
                  addToCart(item, 1);
                }}
              >
                <img src={PlusIcon} alt="Increase" />
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
);

export default CartListItem;
