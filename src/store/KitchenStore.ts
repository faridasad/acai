import {create} from "zustand";
import {persist} from "zustand/middleware"

interface OrderProduct {
  id: number;
  name: string;
  imgUrl: string;
  price: number;
  ingredients?: string[];
  notes?: string;
  quantity?: number;
}

export interface Order {
  id: number;
  items: OrderProduct[];
}

interface KitchenState {
  kitchen: Order[];
}

interface KitchenActions {
  addOrder: (order: Order) => void;
  removeOrder: (order: Order) => void;
  resetKitchen: () => void;
}

const useKitchenStore = create<KitchenState & KitchenActions>()(
  persist((set) => ({
    kitchen: [],
    addOrder: (order: Order) => {
      set((state) => ({
        kitchen: [...state.kitchen, order]
      }))
    },
    removeOrder: (order: Order) => {
      set((state) => ({
        kitchen: state.kitchen.filter(o => o.id !== order.id)
      }))
    },
    resetKitchen: () => {
      set(() => ({
        kitchen: []
      }))
    }
  }), {name: "kitchen-store"})
);

export default useKitchenStore;