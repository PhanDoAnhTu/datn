import { PostData } from '../../utils'
import { Action } from './index'


export const getCart = (data) => async (dispatch) => {
    try {
        const response = await PostData('/cart/v1/findUserCart', data);
        console.log('response:', response)
        return dispatch({ type: Action.GET_CART, payload: response.data });

    } catch (err) {
        console.error(err)
        // return err.response.data

    }
};
export const addToCart = (data) => async (dispatch) => {
    try {
        const response = await PostData('/cart/v1/addTocart', data);
        console.log('response:', response)
        return dispatch({ type: Action.ADD_TO_CART, payload: response.data });

    } catch (err) {
        console.error(err)
        // return err.response.data

    }
};

export const onUpdateQuantityFromCart = (data) => async (dispatch) => {
    try {
        const response = await PostData('/cart/v1/updateQuantityFromCart', data);
        console.log('response:', response)
        return dispatch({ type: Action.UPDATE_FROM_CART, payload: response.data });

    } catch (err) {
        console.error(err)
    }
};
export const onUpdateSkuFromCart = (data) => async (dispatch) => {
    try {
        const response = await PostData('/cart/v1/updateSkuFromCart', data);
        console.log('response:', response)
        return dispatch({ type: Action.UPDATE_FROM_CART, payload: response.data });

    } catch (err) {
        console.error(err)
    }
};
export const onUpdateSkuFromCartV2 = (data) => async (dispatch) => {
    try {
        const response = await PostData('/cart/v1/updateSkuFromCartV2', data);
        console.log('response:', response)
        return dispatch({ type: Action.UPDATE_FROM_CART, payload: response.data });

    } catch (err) {
        console.error(err)
    }
};
export const DeleteToCartItem = (data) => async (dispatch) => {
    try {
        const response = await PostData('/cart/v1/deleteToCartItem', data);
        console.log('response:', response)
        return dispatch({ type: Action.DELETE_TO_CART_ITEM, payload: response.data });

    } catch (err) {
        console.error(err)
        // return err.response.data

    }
};
export const ClearCartItems = (data) => async (dispatch) => {
    try {
        const response = await PostData('/cart/v1/deleteToCartByCartIdAndUserId', data);
        console.log('response:', response)
        return dispatch({ type: Action.CLEAR_CART_ITEMS, payload: response.data });

    } catch (err) {
        console.error(err)
        // return err.response.data

    }
};
