import { PostData } from '../../utils';
import { Action } from './index';

export const findListBrand = (data) => async (dispatch) => {
    try {
        const response = await PostData(
            '/product/v1/brand/findListBrand',
            data
        );
        console.log('response:', response);
        return dispatch({
            type: Action.GET_ALL_BRAND,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        // return err.response.data
    }
};
