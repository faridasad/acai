import { create } from "zustand";

interface ProductProps {
  name: string;
  img_url: string;
  price: number;
  notes?: string;
}

interface BasketState {
  basket: ProductProps[];
  setBasket: (product: ProductProps) => void;
}

const useBasketStore = create<BasketState>()((set) => ({
  basket: [] as ProductProps[],
  setBasket: (product) =>
    set((state) => ({
      basket: [
        ...state.basket,
        product,
      ],
    })),
}));

export default useBasketStore;
