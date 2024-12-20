export * from './user-actions';
export * from './product-actions';
export * from './cart-actions';
export * from './spicial-offer-actions';
export * from './wish-list-actions';
export * from './payment-actions';
export * from './category-actions';
export * from './order-actions';
export * from './review-actions';
export * from './upload-actions';

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
    PRODUCT_BEST_SELLING: 'PRODUCT_BEST_SELLING',
    PRODUCT_FROM_CART: 'PRODUCT_FROM_CART',

    //contact
    NEW_CONTACT: 'NEW_CONTACT',

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
    //Brand
    GET_ALL_BRAND: 'GET_ALL_BRAND',
    //Attribute
    GET_ALL_ATTRIBUTE: 'GET_ALL_ATTRIBUTE',
    //menu
    GET_MENU_BY_POSITION: 'GET_MENU_BY_POSITION',

    //slider
    GET_ALL_SLIDER_BY_ACTIVE: 'GET_ALL_SLIDER_BY_ACTIVE',

    //order
    GET_ALL_ORDER_BY_USER_ID: 'GET_ALL_ORDER_BY_USER_ID',
    //discount
    GET_ALL_DISCOUNT: 'GET_ALL_DISCOUNT',
    DISCOUNT_AMOUNT: 'DISCOUNT_AMOUNT',

    //topic
    GET_ALL_TOPIC: 'GET_ALL_TOPIC',

    //post
    GET_POST_BY_TOPIC: 'GET_POST_BY_TOPIC',
    GET_ALL_POST: 'GET_ALL_POST',
    GET_SINGLE_POST: 'GET_SINGLE_POST',

    //spicial-offer
    SPICIAL_OFFER_BY_PRODUCT: 'SPICIAL_OFFER_BY_PRODUCT',
    SPICIAL_OFFER_TODAY: 'SPICIAL_OFFER_TODAY',

    //wishlist
    ADD_TO_WISH_LIST: 'ADD_TO_WISHLIST',
    REMOVE_FROM_WISH_LIST: 'REMOVE_FROM_WISHLIST',
    GET_WISHLIST: 'GET_WISHLIST',
    DELETE_WISH_LIST: 'DELETE_WISH_LIST',

    //payment
    PAYMENT_MOMO: 'PAYMENT_MOMO',
    PAYMENT_ZALOPAY: 'PAYMENT_ZALOPAY',
    TRANSACTION_STATUS: 'TRANSACTION_STATUS',

    ///order
    STATUS_ORDER: 'STATUS_ORDER',
    CHECKOUT_REVIEW: 'CHECKOUT_REVIEW',
    CREATE_ORDER: 'CREATE_ORDER',
    CURRENT_ORDER: 'CURRENT_ORDER',

    //address
    ADD_ADDRESS: 'ADD_ADDRESS',
    GET_ADDRESS: 'GET_ADDRESS',
    REMOVE_ADDRESS: 'REMOVE_ADDRESS',
    REVIEW_BY_PRODUCT: 'REVIEW_BY_PRODUCT',
    CREATE_REVIEW: 'CREATE_REVIEW',
    ADDRESS_DEFAULT: 'ADDRESS_DEFAULT',

    ///
    UPLOAD_PRODUCT_IMAGE_LIST: 'UPLOAD_PRODUCT_IMAGE_LIST',
    UPLOAD_IMAGE_SINGLE: 'UPLOAD_IMAGE_SINGLE',
    ///

    UPDATE_USER: 'UPDATE_USER',
    PASSWORD_USER: 'PASSWORD_USER',
    NAME_AVATAR: '',
};
