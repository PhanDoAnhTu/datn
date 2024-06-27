import { GetData } from "../../utils/apicall";
import { Action } from "./index";

export const getAllOrder = (data) => async (dispatch) => {
  try {
    const response = await GetData("/order/v1/order/getAllOrder", data);
    console.log("response:", response);
    return dispatch({ type: Action.GET_ALL_ORDER, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
