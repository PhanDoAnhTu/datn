import { PostData } from "@utils/apicall";
import { Action } from ".";

export const updateOneMenu = (data) => async (dispatch) => {
  try {
    const response = await PostData("/menu/v1/updateOneMenu", data);
    return dispatch({ type: Action.UPDATE_ONE_MENU, payload: response.data });
  } catch (err) {}
};

export const createMenu = (data) => async (dispatch) => {
  try {
    const response = await PostData("/menu/v1/createMenu", data);
    return dispatch({ type: Action.UPDATE_ONE_MENU, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const getOneMenu = (data) => async (dispatch) => {
  try {
    const response = await PostData("/menu/v1/getOneMenu", data);
    return dispatch({ type: Action.GET_ALL_MENU, payload: response.data });
  } catch (err) {}
};
export const getAllMenu = (data) => async (dispatch) => {
  try {
    const response = await PostData("/menu/v1/getAllMenu", data);
    return dispatch({ type: Action.GET_ALL_MENU, payload: response.data });
  } catch (err) {}
};
