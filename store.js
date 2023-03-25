import { configureStore } from "@reduxjs/toolkit";
import basketReducer from "./features/BasketSlice";

export default configureStore({
  reducer: {
    basket: basketReducer,
  },
});
