import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current_product: {},
  products: [],

};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setCurrentProduct: (state, action) => {
      console.log(action.payload)
      state.current_product = action.payload.productss;
    },
    setProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const {
  setCurrentProduct,
  setProducts
} = productSlice.actions;

export default productSlice.reducer;
