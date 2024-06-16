import { GetData, PostData } from '../../utils/apicall'
import { Action } from './index'


// export const getSpecialOfferBySpuId = (data) => async (dispatch) => {
//     try {
//         const response = await PostData('/Special-Offer/v1/getSpecialOfferBySpuId', data);
//         console.log('response:', response)
//         return dispatch({ type: Action.SPICIAL_OFFER_BY_PRODUCT, payload: response.data });

//     } catch (err) {
//         console.log(err)

//     }
// };

export const onCreateSpecialOffer = (data) => async (dispatch) => {
    try {
        const response = await PostData('/Special-Offer/v1/createSpecialOffer', data);
        console.log('response:', response)
        return dispatch({ type: Action.CREATE_SPECIAL_OFFER, payload: response.data });

    } catch (err) {
        console.log(err)
    }
};
export const onGetAllSpecialOffer = () => async (dispatch) => {
    try {
        const response = await GetData('/Special-Offer/v1/getAllSpecialOffer');
        console.log('response:', response)
        return dispatch({ type: Action.GET_ALL_PROMOTION, payload: response.data });

    } catch (err) {
        console.log(err)
    }
};
export const onChangeStatusSpecialOfferById = (data) => async (dispatch) => {
    try {
        const response = await PostData('/Special-Offer/v1/onChangeStatusSpecialOfferById',data);
        console.log('response:', response)
        return dispatch({ type: Action.ON_CHANGE_STATUS_PROMOTION, payload: response.data });

    } catch (err) {
        console.log(err)
    }
};
export const removeSpecialOfferById = (data) => async (dispatch) => {
    try {
        const response = await PostData('/Special-Offer/v1/removeSpecialOfferById',data);
        console.log('response:', response)
        return dispatch({ type: Action.REMOVE_PROMOTION, payload: response.data });

    } catch (err) {
        console.log(err)
    }
};