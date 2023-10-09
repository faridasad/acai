import CartListItem from "../../components/CartListItem";
import useCartStore from "../../store/CartStore";

import MessageIcon from "../../assets/images/icon-message.svg";

import "./cart.scss";

interface CartProps {}

const Cart: React.FC<CartProps> = () => {
  const [cart, totalPrice] = useCartStore((state) => [state.cart, state.totalPrice]);

  console.log(cart);

  return (
    <section className="cart">
      <div className="container">
        <ul role="list" className="cart-products-list">
          {cart.map((item) => {
            return <CartListItem item={item} key={item.id} />;
          })}
        </ul>
        <div className="total-price">
          <span>Yekun məbləğ <span className="price">- {totalPrice.toFixed(2)} Azn</span></span>
        </div>
        <button className="add-notes">
          <span>
            <img src={MessageIcon} alt="Add note" />
          </span>
          <span>
            <strong>Mətbəxə şərh əlavə edin</strong>
            Pəhriz, soğansız olsunxüsusi istəklər, və s :)
          </span>
        </button>
      </div>
      <button className="order-button">
        <span>Sifariş Et</span>
      </button>
      <div className="container">
        <div className="suggested-products">
          <h2>Sizin üçün tövsiyyələrimiz</h2>
        </div>
      </div>
    </section>
  );
};

export default Cart;
