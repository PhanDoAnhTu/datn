import { GetData, PostData } from '../../utils/apicall'
import { Action } from './index'


export const createSlider = (data) => async (dispatch) => {
    try {
        const response = await PostData('/slider/v1/slider/createSlider', data);
        console.log('response:', response)
        return dispatch({ type: Action.ADD_SLIDER, payload: response.data });

    } catch (err) {
        console.log(err)
    }
};
export const getAllSliderByActive = (data) => async (dispatch) => {
    try {
        const response = await PostData('/slider/v1/slider/getAllSliderByActive', data);
        console.log('response:', response)
        return dispatch({ type: Action.GET_ALL_SLIDER, payload: response.data });

    } catch (err) {
        console.log(err)
    }
};
export const changeActive = (data) => async (dispatch) => {
    try {
        const response = await PostData('/slider/v1/slider/changeActive', data);
        console.log('response:', response)
        return dispatch({ type: Action.UPDATE_SLIDER, payload: response.data });

    } catch (err) {
        console.log(err)
    }
};
export const isTrash = (data) => async (dispatch) => {
    try {
        const response = await PostData('/slider/v1/slider/isTrash', data);
        console.log('response:', response)
        return dispatch({ type: Action.UPDATE_SLIDER, payload: response.data });

    } catch (err) {
        console.log(err)
    }
}