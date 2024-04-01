import { createSelector } from '@reduxjs/toolkit';

export const selectCatagory = (state) => state.category.name;
export const listProduct = (state) => state.listProduct.list;
export const searchInput = (state) => state.category.search;

export const listItems = createSelector(
  selectCatagory,
  listProduct,
  searchInput,
  (name, list, search) => {
    let regex = new RegExp(search, 'i');
    return list.filter((item) => {
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
