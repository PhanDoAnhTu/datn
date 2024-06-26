import { GetData, PostData } from "../../utils/apicall";
import { Action } from "./index";

export const createTopic = (data) => async (dispatch) => {
  try {
    const response = await PostData("/blog/v1/topic/create", data);
    console.log("response:", response);
    return dispatch({ type: Action.ADD_TOPIC, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const getListTopic = (data) => async (dispatch) => {
  try {
    const response = await PostData("/blog/v1/topic/getListTopic", data);
    console.log("response:", response);
    return dispatch({ type: Action.GET_ALL_TOPIC, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
export const changeIsPublishedTopic = (data) => async (dispatch) => {
  try {
    const response = await PostData("/blog/v1/topic/changeIsPublished", data);
    console.log("response:", response);
    return dispatch({ type: Action.UPDATE_TOPIC, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
export const isTrashTopic = (data) => async (dispatch) => {
  try {
    const response = await PostData("/blog/v1/topic/isTrashTopic", data);
    console.log("response:", response);
    return dispatch({ type: Action.UPDATE_TOPIC, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const createPost = (data) => async (dispatch) => {
  try {
    const response = await PostData("/blog/v1/post/create", data);
    console.log("response:", response);
    return dispatch({ type: Action.ADD_POST, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const getOneTopic = (data) => async (dispatch) => {
  try {
    const response = await PostData("/blog/v1/topic/getOneTopic", data);
    console.log("response:", response);
    return dispatch({ type: Action.GET_ONE_TOPIC, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const updateOneTopic = (data) => async (dispatch) => {
  try {
    const response = await PostData("/blog/v1/topic/updateOneTopic", data);
    console.log("response:", response);
    return dispatch({ type: Action.UPDATE_ONE_TOPIC, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const getListPosts = (data) => async (dispatch) => {
  try {
    const response = await PostData("/blog/v1/post/getListPosts", data);
    console.log("response:", response);
    return dispatch({ type: Action.GET_ALL_DISCOUNT, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};

export const getSinglePost = (data) => async (dispatch) => {
  try {
    const response = await PostData("/blog/v1/post/getSinglePost", data);
    console.log("response:", response);
    return dispatch({ type: Action.GET_ONE_POST, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
export const changeIsPublishedPost = (data) => async (dispatch) => {
  try {
    const response = await PostData("/blog/v1/post/changeIsPublished", data);
    console.log("response:", response);
    return dispatch({ type: Action.UPDATE_POST, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
export const isTrashPost = (data) => async (dispatch) => {
  try {
    const response = await PostData("/blog/v1/post/isTrashPost", data);
    console.log("response:", response);
    return dispatch({ type: Action.UPDATE_POST, payload: response.data });
  } catch (err) {
    console.log(err);
  }
};
