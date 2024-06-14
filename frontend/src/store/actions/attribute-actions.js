import { GetData } from '../../utils';
import { Action } from './index';

export const findAllAttribute = (data) => async (dispatch) => {
    try {
        const response = await GetData(
            '/product/v1/attribute/findAllAttribute',
            data
        );
        console.log('response:', response);
        return dispatch({
            type: Action.GET_ALL_ATTRIBUTE,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        // return err.response.data
    }
};
