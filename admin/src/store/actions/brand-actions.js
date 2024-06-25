import { PostData } from "../../utils/apicall";
import { Action } from "./index";

export const findAllBrand = (data) => async (dispatch) => {
  try {
    const response = await PostData("/product/v1/brand/findListBrand", data);
    console.log("response:", response);
    return dispatch({ type: Action.ALL_BRAND, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const findBrandById = (data) => async (dispatch) => {
  try {
    const response = await PostData("/product/v1/brand/findBrandById", data);
    console.log("response:", response);
    return dispatch({ type: Action.BRAND_BY_ID, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const createBrand = (data) => async (dispatch) => {
  try {
    const response = await PostData("/product/v1/brand/create", data);
    console.log("response:", response);
    return dispatch({ type: Action.CREATE_BRAND, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const updateOneBrand = (data) => async (dispatch) => {
  try {
    const response = await PostData("/product/v1/brand/updateOneBrand", data);
    console.log("response:", response);
    return dispatch({ type: Action.UPDATE_BRAND, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
