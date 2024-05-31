import { Action } from '../actions'

const initialState = {
    cart: null
}

const CartReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_CART:
            localStorage.setItem("cart_products", JSON.stringify(action.payload.metaData.cart_products));
            return {
                ...state,
                cart: action.payload.metaData
            }
        case Action.ADD_TO_CART:
            return {
                ...state,
                cart: null
            }
        case Action.UPDATE_FROM_CART:
            return {
                ...state,
                cart: action.payload.metaData
            }
        case Action.DELETE_TO_CART_ITEM:
            return {
                ...state,
                cart: action.payload.metaData
            }
        case Action.CLEAR_CART_ITEMS:
            localStorage.removeItem("cart_products");
            return {
                ...state,
                cart: null
            }

        default:
            return state;
    }

}

export default CartReducer
