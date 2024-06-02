import { PostData } from '../../utils';
import { Action } from './index';

//MOMO
export const paymentByMoMo = (data) => async (dispatch) => {
    try {
        const response = await PostData('/payment/momo', data);
        console.log('response:', response);
        return dispatch({ type: Action.PAYMENT_MOMO, payload: response.data });
    } catch (err) {
        console.log(err);
        // return err.response.data
    }
};

export const checkOrderByMoMo = (data) => async (dispatch) => {
    try {
        const response = await PostData(
            '/payment/momo/transaction-status',
            data
        );
        console.log('response:', response);
        return dispatch({
            type: Action.TRANSACTION_STATUS,
            payload: response.data,
        });
    } catch (err) {
        console.log(err);
        // return err.response.data
    }
};

//ZALOPAY
export const paymentByZaloPay = (data) => async (dispatch) => {
    try {
        const response = await PostData('/payment/zalopay', data);
        console.log('response:', response);
        return dispatch({
            type: Action.PAYMENT_ZALOPAY,
            payload: response.data,
        });
    } catch (err) {
        console.log(err);
        // return err.response.data
    }
};

export const checkOrderByZaloPay = (data) => async (dispatch) => {
    try {
        const response = await PostData(
            '/payment/zalopay/transaction-status',
            data
        );
        console.log('response:', response);
        return dispatch({
            type: Action.transaction_status,
            payload: response.data,
        });
    } catch (err) {
        console.log(err);
        // return err.response.data
    }
};
