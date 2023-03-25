import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action) => {
      state.items = [...state.items, action.payload];
    },
    removeFromBasket: (state, action) => {
      const index = state.items.findIndex(
        (item) => item._id === action.payload._id
      );
      let newBasket = [...state.items];
      if (index >= 0) {
        newBasket.splice(index, 1);
        state.items = newBasket;
      } else {
        console.warn(
          `Can't remove as the ${action.payload.name} is not in the Basket`
        );
      }
    },
  },
});

// Action creators are generated for each case reducer function
export const { addToBasket, removeFromBasket } = basketSlice.actions;

export const selectBasketItems = (state) => state.basket.items;

export const selectBasketItemsWithId = (state, id) =>
  state.basket.items.filter((item) => item._id === id);

export const selectBasketTotal = (state) =>
  state.basket.items.reduce((total, item) => {
    total = total + item.price;
    return total;
  }, 0);

export default basketSlice.reducer;
