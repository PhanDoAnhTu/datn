import { GetData, PostData } from "../../utils/apicall";
import { Action } from "./index";

export const createSlider = (data) => async (dispatch) => {
  try {
    const response = await PostData("/banner/v1/slider/createSlider", data);

    return dispatch({ type: Action.ADD_SLIDER, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
export const getAllSlider = () => async (dispatch) => {
  try {
    const response = await GetData("/banner/v1/slider/getAllSlider");

    return dispatch({ type: Action.GET_ALL_SLIDER, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
export const changeActiveSlider = (data) => async (dispatch) => {
  try {
    const response = await PostData("/banner/v1/slider/changeActive", data);

    return dispatch({ type: Action.UPDATE_SLIDER, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const updateOneSlider = (data) => async (dispatch) => {
  try {
    const response = await PostData("/banner/v1/slider/updateOneSlider", data);

    return dispatch({ type: Action.UPDATE_ONE_SLIDER, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const getOneSlider = (data) => async (dispatch) => {
  try {
    const response = await PostData("/banner/v1/slider/getOneSlider", data);

    return dispatch({ type: Action.GET_ONE_SLIDER, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const isTrashSlider = (data) => async (dispatch) => {
  try {
    const response = await PostData("/banner/v1/slider/isTrash", data);

    return dispatch({ type: Action.UPDATE_SLIDER, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
