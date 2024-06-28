import { GetData, PostData } from "../../utils/apicall";
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

export const findOrderByTrackingNumber = (data) => async (dispatch) => {
  try {
    const response = await PostData(
      "/order/v1/order/findOrderByTrackingNumber",
      data
    );
    console.log("response:", response);
    return dispatch({
      type: Action.FIND_ORDER_BY_TRACKING_NUMBER,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const changeStatusOrderByOrderId = (data) => async (dispatch) => {
  try {
    const response = await PostData(
      "/order/v1/order/changeStatusOrderByOrderId",
      data
    );
    console.log("response:", response);
    return dispatch({
      type: Action.CHANGE_ORDER_STATUS,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};

export const findOrderByUserId = (data) => async (dispatch) => {
  try {
    const response = await PostData("/order/v1/order/findOrderByUserId", data);
    console.log("response:", response);
    return dispatch({
      type: Action.FIND_ORDER_BY_CUSTOMER_ID,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
  }
};
