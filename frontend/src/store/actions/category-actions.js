import { PostData } from '../../utils';
import { Action } from './index';

export const getCategoryByParentID = (data) => async (dispatch) => {
    try {
        const response = await PostData(
            '/category/v1/getListCategoryByParentId',
            data
        );
        console.log('response:', response);
        return dispatch({
            type: Action.GET_CATEGORY_BY_PARENT_ID,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        // return err.response.data
    }
};

export const getAllCategory = (data) => async (dispatch) => {
    try {
        const response = await PostData('/category/v1/getAllCategory', data);
        console.log('response:', response);
        return dispatch({
            type: Action.GET_ALL_CATEGORY,
            payload: response.data,
        });
    } catch (error) {
        console.error(error);
    }
};
