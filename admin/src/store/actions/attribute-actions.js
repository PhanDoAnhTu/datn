import { PostData } from '../../utils/apicall'
import { Action } from './index'


export const findAllAttribute = (data) => async (dispatch) => {
    try {
        const response = await PostData('/product/v1/attribute/findAllAttribute', data);
        console.log('response:', response)
        return dispatch({ type: Action.ALL_ATTRIBUTE, payload: response.data });

    } catch (err) {
        console.log(err)
    }
};


