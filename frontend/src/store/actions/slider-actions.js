import { PostData } from '../../utils';
import { Action } from './index';

export const getSliderByActive = (data) => async (dispatch) => {
    try {
        const response = await PostData(
            '/banner/v1/slider/getAllSliderByActive',
            data
        );
        console.log('response:', response);
        return dispatch({
            type: Action.GET_ALL_SLIDER_BY_ACTIVE,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        // return err.response.data
    }
};
