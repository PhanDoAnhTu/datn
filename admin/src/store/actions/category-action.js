import { PostData } from '../../utils/apicall'
import { Action } from './index'


export const findAllCategory = (data) => async (dispatch) => {
    try {
        const response = await PostData('/category/v1/getAllCategory', data);
        console.log('response:', response)
        return dispatch({ type: Action.CATEGORY_ALL, payload: response.data });

    } catch (err) {
        console.log(err)

    }
};


