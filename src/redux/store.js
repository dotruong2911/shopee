import { configureStore } from '@reduxjs/toolkit';
import { userCurrent, productCurrent, listProduct } from './reducer';

export const store = configureStore({
  reducer: {
    userCurrent: userCurrent.reducer,
    productCurrent: productCurrent.reducer,
    listProduct: listProduct.reducer,
  },
});
