import { PostData } from '../../utils';
import { Action } from './index';

export const findOrderByUserId = (data) => async (dispatch) => {
    try {
        const response = await PostData(
            '/order/v1/order/findOrderByUserId',
            data
        );
        console.log('response:', response);
        return dispatch({
            type: Action.GET_ALL_ORDER_BY_USER_ID,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        // return err.response.data
    }
};
export const changeStatusOrderByOrderId = (data) => async (dispatch) => {
    try {
        const response = await PostData(
            '/order/v1/order/changeStatusOrderByOrderId',
            data
        );
        console.log('response:', response);
        return dispatch({
            type: Action.STATUS_ORDER,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        // return err.response.data
    }
};
export const checkoutReview = (data) => async (dispatch) => {
    try {
        const response = await PostData(
            '/order/v1/order/checkoutReview',
            data
        );
        console.log('response:', response);
        return dispatch({
            type: Action.STATUS_ORDER,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        // return err.response.data
    }
};
export const createOrder = (data) => async (dispatch) => {
    try {
        const response = await PostData(
            '/order/v1/order/createOrder',
            data
        );
        console.log('response:', response);
        return dispatch({
            type: Action.CREATE_ORDER,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        // return err.response.data
    }
};

