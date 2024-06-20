import { Action } from '../actions';

const initialState = {
    current_product: null,
    all_products: null,
    product_detail: null,
    product_by_category: null,
    product_from_cart: null,
    products_filter: null,
    list_product_image: null,
    data: null,
    product_best_selling: null,
};

const ProductReducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.CURRENT_PRODUCT:
            return {
                ...state,
                current_product: action.payload.metaData,
            };
        case Action.PRODUCT_DETAIL:
            return {
                ...state,
                product_detail: action.payload.metaData,
            };
        case Action.PRODUCT_BY_CATEGORY:
            return {
                ...state,
                product_by_category: action.payload.metaData,
            };
        case Action.PRODUCT_FROM_CART:
            return {
                ...state,
                product_from_cart: action.payload.metaData,
            };
        case Action.ALL_PRODUCTS:
            return {
                ...state,
                all_products: action.payload.metaData,
            };
        case Action.PRODUCTS_FILTER:
            return {
                ...state,
                products_filter: action.payload.metaData,
            };
        case Action.LIST_PRODUCT_IMAGE:
            return {
                ...state,
                list_product_image: action.payload.metaData,
            };
        case Action.PRODUCT_BEST_SELLING:
            return {
                ...state,
                product_best_selling: action.payload.metaData,
            };
        case Action.CALL_DATA:
            return {
                ...state,
                data: action.payload.metaData,
            };

        default:
            return state;
    }
};

export default ProductReducer;
