import { Action } from '../actions'

const initialState = {
    wish_list: null,
    update: false,

}

const WishListReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.GET_WISHLIST:
            action.payload.metaData && localStorage.setItem("favorites", JSON.stringify(action.payload.metaData.wish_list_products));
            return {
                ...state,
                wish_list: action.payload.metaData
            }
        case Action.ADD_TO_WISH_LIST:
            return {
                ...state,
                update: true
            }
        case Action.REMOVE_FROM_WISH_LIST:
            return {
                ...state,
                update: true
            }
        case Action.DELETE_WISH_LIST:
            localStorage.removeItem("favorites");
            return {
                ...state,
                wish_list: { wish_list_products: [] }
            }
        default:
            return state;
    }

}

export default WishListReducer
