export * from './user-actions';
export * from './product-actions';
export * from './cart-actions';
export * from './spicial-offer-actions';
export * from './wish-list-actions';
export * from './payment-actions';

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
    LIST_PRODUCT_IMAGE: 'LIST_PRODUCT_IMAGE',

    ///cart
    GET_CART: 'GET_CART',
    ADD_TO_CART: 'ADD_TO_CART',
    UPDATE_FROM_CART: 'UPDATE_FROM_CART',
    DELETE_TO_CART_ITEM: 'DELETE_TO_CART_ITEM',
    CLEAR_CART_ITEMS: 'CLEAR_CART_ITEMS',
    //getdata
    CALL_DATA: 'CALL_DATA',

    //spicial-offer
    SPICIAL_OFFER_BY_PRODUCT: 'SPICIAL_OFFER_BY_PRODUCT',

    //
    ADD_TO_WISH_LIST: 'ADD_TO_WISHLIST',
    REMOVE_FROM_WISH_LIST: 'REMOVE_FROM_WISHLIST',
    GET_WISHLIST: 'GET_WISHLIST',
    DELETE_WISH_LIST: 'DELETE_WISH_LIST',

    //payment
    PAYMENT_MOMO: 'PAYMENT_MOMO',
    PAYMENT_ZALOPAY: 'PAYMENT_ZALOPAY',
    transaction_status: 'transaction_status',
    // PROFILE: "PROFILE",
    // DISSMISS: "DISSMISS",

    // LANDING_PRODUCTS: "LANDING_PRODUCTS",
    // PRODUCT_DETAILS: "PRODUCT_DETAILS",

    // ADDED_NEW_ADDRESS: "ADDED_NEW_ADDRESS",

    // PLACE_ORDER: "PLACE_ORDER"
};
