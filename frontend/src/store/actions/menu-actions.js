import { PostData } from '../../utils';
import { Action } from './index';

export const findMenuByPosition = (data) => async (dispatch) => {
    try {
        const response = await PostData('/menu/v1/findMenuByPosition', data);

        return dispatch({
            type: Action.GET_MENU_BY_POSITION,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        // return err.response.data
    }
};
