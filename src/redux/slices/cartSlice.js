import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    },
    updateQuantity: (state, action) => {
      const { id, type } = action.payload;
      const itemIndex = state.items.findIndex(item => item.id === id);
      if (itemIndex >= 0) {
        if (type === 'inc') {
          state.items[itemIndex].quantity += 1;
        } else {
          if (state.items[itemIndex].quantity > 1) {
            state.items[itemIndex].quantity -= 1;
          } else {
            state.items.splice(itemIndex, 1);
          }
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { 
  addToCart, 
  removeFromCart, 
  updateQuantity,
  clearCart 
} = cartSlice.actions;

export const selectCartItems = state => state.cart.items;
export const selectCartTotal = state => 
  state.cart.items.reduce((total, item) => total + (item.price * item.quantity), 0);

export default cartSlice.reducer;