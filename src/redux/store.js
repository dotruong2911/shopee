import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  userCurrent,
  productCurrent,
  listProduct,
  cartProduct,
  category,
  // logOuts,
} from './reducer';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  userCurrent: userCurrent.reducer,
  productCurrent: productCurrent.reducer,
  listProduct: listProduct.reducer,
  cartProduct: cartProduct.reducer,
  category: category.reducer,
  // logOuts: logOuts.reducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['userCurrent', 'listProduct'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
