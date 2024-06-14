import { toast } from "react-toastify";
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
    if (response.response.data.code === 500) {
      toast.error(response.response.data.message);
    }
    return dispatch({
      type: Action.UPLOAD_PRODUCT_IMAGE_LIST,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};
