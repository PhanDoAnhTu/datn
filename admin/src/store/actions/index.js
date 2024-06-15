export * from './user-actions';
export * from './product-actions';
export * from './cart-actions';
export * from './spicial-offer-actions';
export * from './upload-actions';
export * from './category-action';
export * from './brand-actions';
export * from './attribute-actions';
export * from './discount-actions';


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
  //spicial-offer
  SPICIAL_OFFER_BY_PRODUCT: "SPICIAL_OFFER_BY_PRODUCT",

  //attribute
  ALL_ATTRIBUTE: "ALL_ATTRIBUTE",
  NEW_ATTRIBUTE: "NEW_ATTRIBUTE",
  //brand

  ALL_BRAND: "ALL_BRAND",
  //discount

  ADD_DISCOUNT: "ADD_DISCOUNT",
  GET_ALL_DISCOUNT: "GET_ALL_DISCOUNT",
  AMOUNT_DISCOUNT: "AMOUNT_DISCOUNT",
  DISCOUNT_BY_ID: "DISCOUNT_BY_ID",





  // PROFILE: "PROFILE",
  // DISSMISS: "DISSMISS",

  // LANDING_PRODUCTS: "LANDING_PRODUCTS",
  // PRODUCT_DETAILS: "PRODUCT_DETAILS",
  // ADD_TO_WISHLIST: "ADD_TO_WISHLIST",
  // REMOVE_FROM_WISHLIST: "REMOVE_FROM_WISHLIST",


  // ADDED_NEW_ADDRESS: "ADDED_NEW_ADDRESS",

  // PLACE_ORDER: "PLACE_ORDER"


};