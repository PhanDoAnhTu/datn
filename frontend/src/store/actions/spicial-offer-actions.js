import { PostData } from '../../utils';
import { Action } from './index';

export const getSpecialOfferBySpuId = (data) => async (dispatch) => {
    try {
        const response = await PostData(
            '/Special-Offer/v1/getSpecialOfferBySpuId',
            data
        );

        return dispatch({
            type: Action.SPICIAL_OFFER_BY_PRODUCT,
            payload: response.data,
        });
    } catch (err) {
        console.log(err);
        // return err.response.data
    }
};

export const specialOfferToday = (data) => async (dispatch) => {
    try {
        const response = await PostData(
            '/Special-Offer/v1/findSpecialOfferBetweenStartDateAndEndByDate',
            data
        );

        return dispatch({
            type: Action.SPICIAL_OFFER_TODAY,
            payload: response.data,
        });
    } catch (err) {
        console.log(err);
        // return err.response.data
    }
};
