import { Action } from '../actions'

const initialState = {
    current_product: null,
    all_products: null,
    products_filter: null,
    list_product_image: null,
    data: null
}

const ProductReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.CURRENT_PRODUCT:
            return {
                ...state,
                current_product: action.payload.metaData
            }
        case Action.ALL_PRODUCTS:
            return {
                ...state,
                all_products: action.payload.metaData
            }
        case Action.PRODUCTS_FILTER:
            return {
                ...state,
                products_filter: action.payload.metaData
            }
        case Action.LIST_PRODUCT_IMAGE:
            return {
                ...state,
                list_product_image: action.payload.metaData
            }
        case Action.CALL_DATA:
            return {
                ...state,
                data: action.payload.metaData
            }

        default:
            return state;
    }

}

export default ProductReducer
