import { Action } from '../actions'

const initialState = {
    cart: null,
    deleteCartItem: null

}

const CartReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_CART:
            // localStorage.setItem("cart", JSON.stringify(action.payload.metaData));
            return {
                ...state,
                cart: action.payload.metaData
            }
        case Action.ADD_TO_CART:
            return {
                ...state,
                cart: action.payload.metaData
            }
        case Action.UPDATE_FROM_CART:
            return {
                ...state,
                cart: action.payload.metaData
            }
        case Action.DELETE_TO_CART_ITEM:
            return {
                ...state,
                deleteCartItem: action.payload.metaData
            }
        case Action.CLEAR_CART_ITEMS:
            // localStorage.removeItem("cart");
            return {
                ...state,
                cart: null
            }

        default:
            return state;
    }

}

export default CartReducer
