import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Array to store items in the cart
  },
  reducers: {
    addItem: (state, action) => {
      let { name, image, cost } = action.payload;

      // Ensure cost is a number (strip $ if it's a string)
      if (typeof cost === 'string') {
        cost = parseFloat(cost.replace('$', ''));
      }

      const existingItem = state.items.find(item => item.name === name);

      if (existingItem) {
        // If already exists, increase quantity
        existingItem.quantity += 1;
      } else {
        // If new, push with quantity 1
        state.items.push({ name, image, cost, quantity: 1 });
      }
    },

    removeItem: (state, action) => {
      state.items = state.items.filter(item => item.name !== action.payload);
    },

    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const itemToUpdate = state.items.find(item => item.name === name);
      if (itemToUpdate && quantity >= 0) {
        itemToUpdate.quantity = quantity;
      }
    },

    incrementQuantity: (state, action) => {
      const item = state.items.find(item => item.name === action.payload);
      if (item) {
        item.quantity += 1;
      }
    },

    decrementQuantity: (state, action) => {
      const item = state.items.find(item => item.name === action.payload);
      if (item && item.quantity > 0) {
        item.quantity -= 1;
      }
    },

    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  incrementQuantity,
  decrementQuantity,
  clearCart,
} = CartSlice.actions;

export default CartSlice.reducer;