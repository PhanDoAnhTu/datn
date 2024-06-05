import { PostData } from '../../utils';
import { Action } from './index';

export const getListPosts = (data) => async (dispatch) => {
    try {
        const response = await PostData('/blog/v1/post/getListPosts', data);
        console.log('response:', response);
        return dispatch({
            type: Action.GET_ALL_POST,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        // return err.response.data
    }
};

export const getListPostsByTopicId = (data) => async (dispatch) => {
    try {
        const response = await PostData(
            '/blog/v1/post/getListPostsByTopicId',
            data
        );
        console.log('response:', response);
        return dispatch({
            type: Action.GET_POST_BY_TOPIC,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        // return err.response.data
    }
};

export const getSinglePost = (data) => async (dispatch) => {
    try {
        const response = await PostData('/blog/v1/post/getSinglePost', data);
        console.log('response:', response);
        return dispatch({
            type: Action.GET_SINGLE_POST,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        // return err.response.data
    }
};
