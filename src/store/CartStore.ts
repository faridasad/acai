import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Product {
  id: number;
  name: string;
  imgUrl: string;
  price: number;
  ingredients?: string[];
  notes?: string;
  quantity?: number;
}

interface CartState {
  cart: Product[];
  totalItems: number;
  totalPrice: number;
}

interface CartActions {
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (product: Product) => void;
  decreaseCartProduct: (product: Product) => void;
  updateNotes: (_id: number, notes: string) => void;
}

const INITIAL_STATE: CartState = {
  cart: [],
  totalItems: 0,
  totalPrice: 0,
};

const useCartStore = create<CartState & CartActions>()(
  persist(
    (set, get) => ({
      cart: INITIAL_STATE.cart,
      totalItems: INITIAL_STATE.totalItems,
      totalPrice: INITIAL_STATE.totalPrice,
      addToCart: (product: Product, quantity) => {
        const cart = get().cart;
        const cartItem = cart.find((item) => item.id === product.id);

        if (!cartItem) {
          const updatedCart = [...cart, { ...product, quantity }];

          set((state) => ({
            cart: updatedCart,
            totalItems: state.totalItems + 1,
            totalPrice: state.totalPrice + product.price,
          }));
          return;
        }

        const updatedCart = cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity as number) + quantity }
            : item
        );
        set((state) => ({
          cart: updatedCart,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + product.price,
        }));
      },
      removeFromCart: (product: Product) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.id !== product.id),
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - product.price,
        }));
      },
      decreaseCartProduct: (product: Product) => {
        const cart = get().cart;

        const updatedCart = cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: (item.quantity as number) - 1 }
            : item
        );

        set((state) => ({
          cart: updatedCart,
          totalItems: state.totalItems - 1,
          totalPrice: state.totalPrice - product.price,
        }));
      },
      updateNotes: (_id: number, notes: string) => {
        const cart = get().cart;

        const updatedCart = cart.map((item) =>
          item.id === _id ? { ...item, notes } : item
        );

        set((state) => ({
          cart: updatedCart,
          totalItems: state.totalItems,
          totalPrice: state.totalPrice,
        }));
      },
    }),
    { name: "cart-items" }
  )
);

export default useCartStore;
