import { PostData } from '../../utils';
import { Action } from './index';

export const getAllDiscount = (data) => async (dispatch) => {
    try {
        const response = await PostData('/discount/v1/getAllDiscount', data);
        return dispatch({
            type: Action.GET_ALL_DISCOUNT,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        // return err.response.data
    }
};

export const discountAmount = (data) => async (dispatch) => {
    try {
        const response = await PostData('/discount/v1/discountAmount', data);
        return dispatch({
            type: Action.DISCOUNT_AMOUNT,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        // return err.response.data
    }
};
