import { PostData } from '../../utils';
import { Action } from './index';

export const addToWishList = (data) => async (dispatch) => {
    try {
        const response = await PostData('/wish-list/v1/addProduct', data);

        return dispatch({
            type: Action.ADD_TO_WISH_LIST,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        // return err.response.data
    }
};

export const removeFromWishList = (data) => async (dispatch) => {
    try {
        const response = await PostData(
            '/wish-list/v1/removeWishListItem',
            data
        );

        return dispatch({
            type: Action.REMOVE_FROM_WISH_LIST,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        // return err.response.data
    }
};
export const deleteWishListByUserId = (data) => async (dispatch) => {
    try {
        const response = await PostData(
            '/wish-list/v1/deleteToWishListByUserId',
            data
        );

        return dispatch({
            type: Action.DELETE_WISH_LIST,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        // return err.response.data
    }
};
export const getWishListByUserId = (data) => async (dispatch) => {
    try {
        const response = await PostData('/wish-list/v1/getUserWishList', data);

        return dispatch({ type: Action.GET_WISHLIST, payload: response.data });
    } catch (err) {
        console.error(err);
        // return err.response.data
    }
};
