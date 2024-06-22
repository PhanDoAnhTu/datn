import { PostData } from "../../utils/apicall";
import { Action } from "../actions";

export const upLoadProductImageList = (data) => async (dispatch) => {
  try {
    const response = await PostData(
      "/upload/v1/upload/product/uploadSkuImageList",
      data
    );
    console.log("response:", response);
    return dispatch({
      type: Action.UPLOAD_PRODUCT_IMAGE_LIST,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};
export const upLoadImageArray = (data) => async (dispatch) => {
  try {
    const response = await PostData("/upload/v1/upload/uploadImageArray", data);

    console.log("response:", response);
    return dispatch({
      type: Action.UPLOAD_PRODUCT_IMAGE_LIST,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};
export const upLoadImageSingle = (data) => async (dispatch) => {
  try {
    const response = await PostData("/upload/v1/upload/uploadSingleImage", data);

    console.log("response:", response);
    return dispatch({
      type: Action.UPLOAD_IMAGE_SINGLE,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};