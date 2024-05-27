import { Action } from '../actions'

const initialState = {
    wish_list: localStorage.getItem("favorites") ? JSON.parse(localStorage.getItem("favorites")) : null,
    hasRemove: false

}

const WishListReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_WISHLIST:
            localStorage.setItem("favorites", JSON.stringify(action.payload.metaData));
            return {
                ...state,
                wish_list: action.payload.metaData
            }
        case Action.ADD_TO_WISH_LIST:
            return {
                ...state,
                wish_list: action.payload.metaData
            }
        case Action.REMOVE_FROM_WISH_LIST:
            return {
                ...state,
                hasRemove: true
            }
        case Action.DELETE_WISH_LIST:
            return {
                ...state,
                wish_list: null
            }
        default:
            return state;
    }

}

export default WishListReducer
