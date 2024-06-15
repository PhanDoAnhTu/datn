import { PostData } from '../../utils/apicall'
import { Action } from './index'


export const onAddDiscount = (data) => async (dispatch) => {
    try {
        const response = await PostData('/discount/v1/create', data);
        console.log('response:', response)
        return dispatch({ type: Action.ADD_DISCOUNT, payload: response.data });

    } catch (err) {
        console.log(err)
    }
};

export const onGetAllDiscount = (data) => async (dispatch) => {
    try {
        const response = await PostData('/discount/v1/getAllDiscount', data);
        console.log('response:', response)
        return dispatch({ type: Action.GET_ALL_DISCOUNT, payload: response.data });

    } catch (err) {
        console.log(err)
    }
};

export const onFindDiscountById = (data) => async (dispatch) => {
    try {
        const response = await PostData('/discount/v1/findOneDiscount', data);
        console.log('response:', response)
        return dispatch({ type: Action.DISCOUNT_BY_ID, payload: response.data });

    } catch (err) {
        console.log(err)
    }
};
// export const onDiscountAmount = (data) => async (dispatch) => {
//     try {
//         const response = await PostData('/discount/v1/discountAmount', data);
//         console.log('response:', response)
//         return dispatch({ type: Action.AMOUNT_DISCOUNT, payload: response.data });

//     } catch (err) {
//         console.log(err)
//     }
// };



