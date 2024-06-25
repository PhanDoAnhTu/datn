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

export const createCategory = (data) => async (dispatch) => {
    try {
        const response = await PostData('/category/v1/create', data);
        console.log('response:', response)
        return dispatch({ type: Action.CATEGORY_CREATE, payload: response.data });

    } catch (err) {
        console.log(err)

    }
};
export const isTrashcategory = (data) => async (dispatch) => {
    try {
        const response = await PostData('/category/v1/isTrashcategory', data);
        console.log('response:', response)
        return dispatch({ type: Action.CATEGORY_CREATE, payload: response.data });

    } catch (err) {
        console.log(err)

    }
};
export const changeIsPublishedCategory = (data) => async (dispatch) => {
    try {
        const response = await PostData('/category/v1/changeIsPublished', data);
        console.log('response:', response)
        return dispatch({ type: Action.CATEGORY_CREATE, payload: response.data });

    } catch (err) {
        console.log(err)

    }
};

