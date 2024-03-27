import { createSlice } from '@reduxjs/toolkit';

export const listProduct = createSlice({
  name: 'listProduct',
  initialState: {
    list: [],
  },
  reducers: {
    addList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const { addList } = listProduct.actions;

export const userCurrent = createSlice({
  name: 'userCurrent',
  initialState: {
    name: '',
  },
  reducers: {
    addUser: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const { addUser } = userCurrent.actions;

export const productCurrent = createSlice({
  name: 'productCurrent',
  initialState: {
    id: '',
  },
  reducers: {
    selectProduct: (state, action) => {
      state.id = action.payload;
    },
  },
});

export const { selectProduct } = productCurrent.actions;
