import { PostData } from '../../utils/apicall'
import { Action } from './index'


export const getCart = (data) => async (dispatch) => {
    try {
        const response = await PostData('/cart/v1/listByUserId', data);
        console.log('response:', response)
        return dispatch({ type: Action.GET_CART, payload: response.data });

    } catch (err) {
        console.log(err)
        return err.response.data

    }
};
// export const addToCart = (data) => async (dispatch) => {
//     try {
//         const response = await PostData('/cart/v1/addTocart',data);
//         console.log('response:', response)
//         return dispatch({ type: Action.ADD_TO_CART, payload: response.data });

//     } catch (err) {
//         console.log(err)
//         return err.response.data

//     }
// };

// export const UpdateFromCart = (data) => async (dispatch) => {
//     try {
//         const response = await PostData('/cart/v1/updateToCart', data);
//         console.log('response:', response)
//         return dispatch({ type: Action.UPDATE_FROM_CART, payload: response.data });

//     } catch (err) {
//         console.log(err)
//         return err.response.data

//     }
// };
// export const DeleteToCartItem = (data) => async (dispatch) => {
//     try {
//         const response = await PostData('/cart/v1/deleteToCartItem', data);
//         console.log('response:', response)
//         return dispatch({ type: Action.DELETE_TO_CART_ITEM, payload: response.data });

//     } catch (err) {
//         console.log(err)
//         return err.response.data

//     }
// };
// export const ClearCartItems = (data) => async (dispatch) => {
//     try {
//         const response = await PostData('/cart/v1/deleteToCartByCartIdAndUserId', data);
//         console.log('response:', response)
//         return dispatch({ type: Action.CLEAR_CART_ITEMS, payload: response.data });

//     } catch (err) {
//         console.log(err)
//         return err.response.data

//     }
// };
