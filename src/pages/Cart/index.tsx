// React and Hooks
import useCartStore from "../../store/CartStore";
import { useNavigate } from "react-router-dom";

// Components and Pages
import { Drawer } from "vaul";
import CartListItem from "../../components/CartListItem";

// Dummy Data
import CategoriesData from "../../data/categories.json";

// Assets and Styles
import MessageIcon from "../../assets/images/icon-message.svg";
import "./cart.scss";
import CategoryListItem from "../../components/CategoryListItem";
import { useState } from "react";
import { SelectedProduct } from "../Category";

// Types
interface CartProps {}

const Cart: React.FC<CartProps> = () => {
  const [cart, totalPrice, updateNotes, resetCart] = useCartStore((state) => [
    state.cart,
    state.totalPrice,
    state.updateNotes,
    state.resetCart,
  ]);
  const categories = CategoriesData.categories;

  const allProducts = [...categories.salads.items, ...categories.soups.items];

  const cartIngredients = cart.map((p) => p.ingredients).flat();

  const suggestedProducts = allProducts.filter((product) => {
    // Check if the product's ingredients contain any of the cart ingredients.
    return (
      cartIngredients.some((ingredient) => {
        if (ingredient === undefined) return;

        return product.ingredients.includes(ingredient)
      }) &&
      // Check if the product is not already in the cart.
      !cart.some((cartItem) => cartItem.id === product.id)
    );
  });

  const navigate = useNavigate();
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  return (
    <section className="cart">
      <div className="container">
        {cart.length > 0 ? (
          <ul role="list" className="cart-products-list">
            {cart.map((item) => {
              return <CartListItem item={item} key={item.id} />;
            })}
          </ul>
        ) : (
          <h1>Səbətiniz Boşdur 🛒</h1>
        )}
        <div className="total-price">
          <span>
            Yekun məbləğ{" "}
            <span className="price">- {totalPrice.toFixed(2)} Azn</span>
          </span>
        </div>
        <Drawer.Root>
          <Drawer.Trigger asChild>
            <div role="button" className="add-notes">
              <span>
                <img src={MessageIcon} alt="Add note" />
              </span>
              <span>
                <strong>Mətbəxə şərh əlavə edin</strong>
                Pəhriz, soğansız olsunxüsusi istəklər, və s :)
              </span>
            </div>
          </Drawer.Trigger>
          {/* Draggable modal */}
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 bg-black/40" />
            <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
              <div className="p-3 bg-white rounded-t-[10px] flex-1">
                <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-accent-100 mb-8" />
                <div className="max-w-xl mx-auto flex flex-col">
                  <section className="modal-notes">
                    <h2>Notes</h2>
                    <div className="modal-notes__inner">
                      <ul role="list">
                        {cart.map((c) => {
                          return (
                            <li key={c.id}>
                              <span>{c.name}</span>
                              <textarea
                                name=""
                                id=""
                                value={c.notes && c.notes}
                                placeholder={
                                  !c.notes ? "İstək əlavə edin.." : ""
                                }
                                onChange={(e) => {
                                  updateNotes(c.id, e.target.value);
                                }}
                              >
                                {c.notes && c.notes}
                              </textarea>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  </section>
                </div>
              </div>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      </div>
      <button
        className="order-button"
        disabled={cart.length <= 0}
        onClick={() => {
          if (cart.length <= 0) return;

          //    API CALL   //
          //               //
          //               //
          //               //
          //  //  //  //   //

          resetCart();
          navigate("/order");
        }}
      >
        <span>Sifariş Et</span>
      </button>
      <div className="container">
        <div className="suggested-products">
          <h2>Sizin üçün tövsiyyələrimiz</h2>
          <ul role="list" className="suggested-products-list">
            {suggestedProducts.map((product) => {
              return (
                <Drawer.Root key={product.id}>
                  <Drawer.Trigger asChild>
                    <CategoryListItem
                      item={product}
                      isInModal={false}
                      setSelectedProducts={setSelectedProducts}
                      selectedProducts={selectedProducts}
                    />
                  </Drawer.Trigger>
                  {/* Draggable modal */}
                  <Drawer.Portal>
                    <Drawer.Overlay className="fixed inset-0 bg-black/40" />
                    <Drawer.Content className="bg-zinc-100 flex flex-col rounded-t-[10px] mt-24 fixed bottom-0 left-0 right-0">
                      <div className="p-3 bg-white rounded-t-[10px] flex-1">
                        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-accent-100 mb-8" />
                        <div className="max-w-md mx-auto flex flex-col">
                          <CategoryListItem
                            item={product}
                            isInModal={true}
                            setSelectedProducts={setSelectedProducts}
                            selectedProducts={selectedProducts}
                          />
                        </div>
                      </div>
                    </Drawer.Content>
                  </Drawer.Portal>
                </Drawer.Root>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Cart;
