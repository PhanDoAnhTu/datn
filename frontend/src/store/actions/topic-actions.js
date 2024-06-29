import { PostData } from '../../utils';
import { Action } from './index';

export const getListTopic = (data) => async (dispatch) => {
    try {
        const response = await PostData('/blog/v1/topic/getListTopic', data);

        return dispatch({
            type: Action.GET_ALL_TOPIC,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        // return err.response.data
    }
};
