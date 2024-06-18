import { Action } from '../actions'

const initialState = {
    cart: null
}

const CartReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_CART:
            localStorage.setItem("cart", JSON.stringify(action.payload.metaData));
            return {
                ...state,
                cart: action.payload.metaData
            }
        case Action.ADD_TO_CART:
            localStorage.setItem("cart", JSON.stringify(action.payload.metaData));
            return {
                ...state,
                cart: action.payload.metaData
            }
        case Action.UPDATE_FROM_CART:
            localStorage.setItem("cart", JSON.stringify(action.payload.metaData));
            return {
                ...state,
                cart: action.payload.metaData
            }
        case Action.DELETE_TO_CART_ITEM:
            localStorage.setItem("cart", JSON.stringify(action.payload.metaData));
            return {
                ...state,
                cart: action.payload.metaData
            }
        case Action.CLEAR_CART_ITEMS:
            localStorage.removeItem("cart");
            localStorage.removeItem("selected_list_from_cart");

            return {
                ...state,
                cart: null
            }

        default:
            return state;
    }

}

export default CartReducer
