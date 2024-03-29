import { createSelector } from '@reduxjs/toolkit';

export const selectCatagory = (state) => state.category.name;
export const searchInput = (state) => state.category.search;
export const listProduct = (state) => state.listProduct.list;

export const listItems = createSelector(
  selectCatagory,
  listProduct,
  searchInput,
  (name, list, search) => {
    return list.filter((item) => {
      let regex = new RegExp(search);
      return item.category.name.includes(name) && regex.test(item.name);
    });
  }
);

export const cartProduct = (state) => state.cartProduct.list;
export const deleteProduct = (state) => state.cartProduct.listDelete;

export const listCartProducts = createSelector(
  cartProduct,
  deleteProduct,
  (carts, deletes) => {
    return carts.filter((item) => {
      return !deletes.includes(item._id);
    });
  }
);
