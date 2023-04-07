import { createReducer } from "@reduxjs/toolkit";

export const cartReducer = createReducer(
  {
    cartItems: [],
    subTotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  },
  {
    addToCart: (state, action) => {
      const item = action.payload;
      const isItemExist = state.cartItems.find((i) => i.id === item.id);

      if (isItemExist) {
        const ind = state.cartItems.findIndex((i) => i.id === item.id);
        state.cartItems[ind].quantity++;
      } else {
        state.cartItems.push(item);
      }
    },
    decrement: (state, action) => {
      const id = action.payload;
      const ind = state.cartItems.findIndex((i) => i.id === id);
      state.cartItems[ind].quantity--;
      if (state.cartItems[ind].quantity === 0) {
        state.cartItems.splice(ind, 1);
      }
    },
    deleteItem: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i.id !== action.payload);
    },

    calculatePrice: (state) => {
      let tp = 0;
      state.cartItems.forEach((item) => {
        let num = item.price * item.quantity;
        tp += num;
      });
      state.subTotal = tp;
      state.shipping = tp > 1000 ? 0 : 200;
      if (tp === 0) state.shipping = 0;
      state.tax = +(tp * 0.18).toFixed();
      state.total = state.shipping + state.subTotal + state.tax;
    },
  }
);
