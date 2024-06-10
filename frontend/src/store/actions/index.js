export * from './user-actions';
export * from './product-actions';
export * from './cart-actions';
export * from './spicial-offer-actions';
export * from './wish-list-actions';
export * from './payment-actions';
export * from './category-actions';

export const Action = {
    //auth
    ERROR: 'ERROR',
    LOGIN: 'LOGIN',
    LOGOUT: 'LOGOUT',
    SIGNUP: 'SIGNUP',
    LOGIN_WITH_FACEBOOK: 'LOGIN_WITH_FACEBOOK',
    LOGIN_WITH_GOOGLE: 'LOGIN_WITH_GOOGLE',
    ///product
    CURRENT_PRODUCT: 'CURRENT_PRODUCT',
    ALL_PRODUCTS: 'ALL_PRODUCTS',
    PRODUCTS_FILTER: 'PRODUCTS_FILTER',
    LIST_PRODUCT_IMAGE: 'LIST_PRODUCT_IMAGE',
    PRODUCT_DETAIL: 'PRODUCT_DETAIL',
    PRODUCT_BY_CATEGORY: 'PRODUCT_BY_CATEGORY',
    PRODUCT_FROM_CART: 'PRODUCT_FROM_CART',


    ///cart
    GET_CART: 'GET_CART',
    ADD_TO_CART: 'ADD_TO_CART',
    UPDATE_FROM_CART: 'UPDATE_FROM_CART',
    DELETE_TO_CART_ITEM: 'DELETE_TO_CART_ITEM',
    CLEAR_CART_ITEMS: 'CLEAR_CART_ITEMS',
    //getdata
    CALL_DATA: 'CALL_DATA',
    //category
    GET_CATEGORY_BY_PARENT_ID: 'GET_CATEGORY_BY_PARENT_ID',
    GET_ALL_CATEGORY: 'GET_ALL_CATEGORY',

    //slider
    GET_ALL_SLIDER_BY_ACTIVE: 'GET_ALL_SLIDER_BY_ACTIVE',

    //topic
    GET_ALL_TOPIC: 'GET_ALL_TOPIC',

    //post
    GET_POST_BY_TOPIC: 'GET_POST_BY_TOPIC',
    GET_ALL_POST: 'GET_ALL_POST',
    GET_SINGLE_POST: 'GET_SINGLE_POST',

    //spicial-offer
    SPICIAL_OFFER_BY_PRODUCT: 'SPICIAL_OFFER_BY_PRODUCT',
    SPICIAL_OFFER_TODAY: 'SPICIAL_OFFER_TODAY',

    //
    ADD_TO_WISH_LIST: 'ADD_TO_WISHLIST',
    REMOVE_FROM_WISH_LIST: 'REMOVE_FROM_WISHLIST',
    GET_WISHLIST: 'GET_WISHLIST',
    DELETE_WISH_LIST: 'DELETE_WISH_LIST',

    //payment
    PAYMENT_MOMO: 'PAYMENT_MOMO',
    PAYMENT_ZALOPAY: 'PAYMENT_ZALOPAY',
    TRANSACTION_STATUS: 'TRANSACTION_STATUS',
    // PROFILE: "PROFILE",
    // DISSMISS: "DISSMISS",

    // LANDING_PRODUCTS: "LANDING_PRODUCTS",
    // PRODUCT_DETAILS: "PRODUCT_DETAILS",

    // ADDED_NEW_ADDRESS: "ADDED_NEW_ADDRESS",

    // PLACE_ORDER: "PLACE_ORDER"
};
