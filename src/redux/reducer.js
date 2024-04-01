import { SatelliteAlt } from '@mui/icons-material';
import { createSlice } from '@reduxjs/toolkit';

export const category = createSlice({
  name: 'category',
  initialState: {
    name: '',
    search: '',
  },
  reducers: {
    addCategory: (state, action) => {
      state.name = action.payload;
    },
    addSearch: (state, action) => {
      state.search = action.payload;
    },
  },
});

export const { addCategory, addSearch } = category.actions;

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
    phone: '',
  },
  reducers: {
    addUser: (state, action) => {
      state.name = action.payload;
    },
    addPhone: (state, action) => {
      state.phone = action.payload;
    },
  },
});

export const { addUser, addPhone } = userCurrent.actions;

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

export const cartProduct = createSlice({
  name: 'cartProduct',
  initialState: {
    list: [],
    listDelete: [],
  },
  reducers: {
    userProduct: (state, action) => {
      state.list = action.payload;
    },
    addProduct: (state, action) => {
      state.list.push(action.payload);
    },
    deleteProduct: (state, action) => {
      const arr = action.payload.split(',');
      for (let i of arr) {
        state.listDelete.push(i);
      }
    },
    deleteAllProduct: (state) => {
      state.list = [];
    },
  },
});

export const { userProduct, addProduct, deleteProduct, deleteAllProduct } =
  cartProduct.actions;
