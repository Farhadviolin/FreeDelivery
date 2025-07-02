import create from 'zustand';

interface CartItem { id: string; name: string; qty: number; price: number; }
interface CartState {
  items: CartItem[];
  add: (item: CartItem) => void;
  updateQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  total: () => number;
}
export const useCartStore = create<CartState>(set => ({
  items: [],
  add: item => set(state => {
    const exists = state.items.find(i => i.id === item.id);
    return { items: exists
      ? state.items.map(i => i.id === item.id ? { ...i, qty: i.qty + item.qty } : i)
      : [...state.items, item]
    };
  }),
  updateQty: (id, qty) => set(state => ({
    items: state.items.map(i => i.id === id ? { ...i, qty } : i)
  })),
  remove: id => set(state => ({ items: state.items.filter(i => i.id !== id) })),
  clear: () => set({ items: [] }),
  total: () => {
    const { items } = useCartStore.getState();
    return items.reduce((sum, i) => sum + i.price * i.qty, 0);
  }
}));
