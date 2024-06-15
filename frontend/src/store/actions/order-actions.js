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
