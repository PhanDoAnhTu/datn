import { PostData } from '../../utils';
import { Action } from './index';

export const findReviewByProductId = (data) => async (dispatch) => {
    try {
        const response = await PostData(
            '/product/v1/review/findReviewByProductId',
            data
        );

        return dispatch({
            type: Action.REVIEW_BY_PRODUCT,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        // return err.response.data
    }
};

export const createReview = (data) => async (dispatch) => {
    try {
        const response = await PostData(
            '/product/v1/review/createReview',
            data
        );

        return dispatch({
            type: Action.CREATE_REVIEW,
            payload: response.data,
        });
    } catch (err) {
        console.error(err);
        // return err.response.data
    }
};
