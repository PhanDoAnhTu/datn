import { GetData, PostData } from '../../utils/apicall'
import { Action } from './index'


export const findAllAttribute = () => async (dispatch) => {
    try {
        const response = await GetData('/product/v1/attribute/findAllAttribute');
        console.log('response:', response)
        return dispatch({ type: Action.ALL_ATTRIBUTE, payload: response.data });

    } catch (err) {
        console.log(err)
    }
};


export const createAttribute = (data) => async (dispatch) => {
    try {
        const response = await PostData('/product/v1/attribute/newAttribute', data);
        console.log('response:', response)
        return dispatch({ type: Action.NEW_ATTRIBUTE, payload: response.data });

    } catch (err) {
        console.log(err)
    }
};
export const updateAttributeById = (data) => async (dispatch) => {
    try {
        const response = await PostData('/product/v1/attribute/updateAttributeById', data);
        console.log('response:', response)
        return dispatch({ type: Action.NEW_ATTRIBUTE, payload: response.data });

    } catch (err) {
        console.log(err)
    }
};
export const removeAttributeById = (data) => async (dispatch) => {
    try {
        const response = await PostData('/product/v1/attribute/removeAttributeById', data);
        console.log('response:', response)
        return dispatch({ type: Action.NEW_ATTRIBUTE, payload: response.data });

    } catch (err) {
        console.log(err)
    }
};


