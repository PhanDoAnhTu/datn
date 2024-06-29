import { Action } from './index';
import { PostData } from '../../utils';

export const newContact = (data) => async (dispatch) => {
    try {
        const response = await PostData('/contact/v1/newContact', data);

        return dispatch({ type: Action.NEW_CONTACT, payload: response.data });
    } catch (err) {
        console.log(err);
        return err.response.data;
    }
};
