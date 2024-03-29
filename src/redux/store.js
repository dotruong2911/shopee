import { configureStore } from '@reduxjs/toolkit';
import {
  userCurrent,
  productCurrent,
  listProduct,
  cartProduct,
  category,
} from './reducer';

export const store = configureStore({
  reducer: {
    category: category.reducer,
    userCurrent: userCurrent.reducer,
    productCurrent: productCurrent.reducer,
    listProduct: listProduct.reducer,
    cartProduct: cartProduct.reducer,
  },
});
