export * from "./user-actions";
export * from "./product-actions";
export * from "./cart-actions";
export * from "./spicial-offer-actions";
export * from "./upload-actions";
export * from "./category-action";
export * from "./brand-actions";
export * from "./attribute-actions";
export * from "./discount-actions";
export * from "./slider-actions";
export * from "./contact-actions";
export * from "./blog-actions";

export const Action = {
  //auth
  ERROR: "ERROR",
  LOGIN: "LOGIN",
  LOGOUT: "LOGOUT",
  SIGNUP: "SIGNUP",
  LOGIN_WITH_FACEBOOK: "LOGIN_WITH_FACEBOOK",
  LOGIN_WITH_GOOGLE: "LOGIN_WITH_GOOGLE",
  ///product
  CURRENT_PRODUCT: "CURRENT_PRODUCT",
  ALL_PRODUCTS: "ALL_PRODUCTS",
  LIST_PRODUCT_IMAGE: "LIST_PRODUCT_IMAGE",
  CREATE_PRODUCT: "CREATE_PRODUCT",
  UPLOAD_PRODUCT_IMAGE_LIST: "UPLOAD_PRODUCT_IMAGE_LIST",
  CHANGE_STATE_PRODUCT: "CHANGE_STATE_PRODUCT",
  PRODUCT_DETAIL: "PRODUCT_DETAIL",

  ///cart
  GET_CART: "GET_CART",
  ADD_TO_CART: "ADD_TO_CART",
  UPDATE_FROM_CART: "UPDATE_FROM_CART",
  DELETE_TO_CART_ITEM: "DELETE_TO_CART_ITEM",
  CLEAR_CART_ITEMS: "CLEAR_CART_ITEMS",
  //getdata
  CALL_DATA: "CALL_DATA",

  //category
  CATEGORY_ALL: "CATEGORY_ALL",
  CATEGORY_CREATE: "CATEGORY_CREATE",

  //spicial-offer
  SPICIAL_OFFER_BY_PRODUCT: "SPICIAL_OFFER_BY_PRODUCT",
  CREATE_SPECIAL_OFFER: "CREATE_SPECIAL_OFFER",
  GET_ALL_PROMOTION: "GET_ALL_PROMOTION",
  ON_CHANGE_STATUS_PROMOTION: "ON_CHANGE_STATUS_PROMOTION",
  REMOVE_PROMOTION: "REMOVE_PROMOTION",

  //attribute
  ALL_ATTRIBUTE: "ALL_ATTRIBUTE",
  NEW_ATTRIBUTE: "NEW_ATTRIBUTE",
  //brand

  ALL_BRAND: "ALL_BRAND",
  CREATE_BRAND: "CREATE_BRAND",
  UPDATE_BRAND: "UPDATE_BRAND",
  BRAND_BY_ID: "BRAND_BY_ID",

  //discount

  ADD_DISCOUNT: "ADD_DISCOUNT",
  GET_ALL_DISCOUNT: "GET_ALL_DISCOUNT",
  AMOUNT_DISCOUNT: "AMOUNT_DISCOUNT",
  DISCOUNT_BY_ID: "DISCOUNT_BY_ID",

  //contact

  //contact

  ALL_CONTACT: "ALL_CONTACT",
  NEW_CONTACT: "NEW_CONTACT",
  FIND_CONTACT: "FIND_CONTACT",
  UPDATE_CONTACT: "UPDATE_CONTACT",

  ///slider
  ADD_SLIDER: "ADD_SLIDER",
  UPDATE_SLIDER: "UPDATE_SLIDER",
  GET_ALL_SLIDER: "GET_ALL_SLIDER",
  GET_ONE_SLIDER: "GET_ONE_SLIDER",
  UPDATE_ONE_SLIDER: "UPDATE_ONE_SLIDER",

  ///blog

  ADD_TOPIC: "ADD_TOPIC",
  ADD_POST: "ADD_POST",
  GET_ONE_TOPIC: "GET_ONE_TOPIC",
  UPDATE_ONE_TOPIC: "UPDATE_ONE_TOPIC",
  GET_ALL_TOPIC: "GET_ALL_TOPIC",
  GET_ALL_POST: "GET_ALL_POST",
  UPDATE_TOPIC: "UPDATE_TOPIC",
  UPDATE_POST: "UPDATE_POST",
  GET_ONE_POST: "GET_ONE_POST",
};
