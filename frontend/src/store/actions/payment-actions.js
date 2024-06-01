import { PostData } from '../../utils'
import { Action } from './index'


export const paymentByMoMo = (data) => async (dispatch) => {
  try {
    const response = await PostData('/payment/momo',data);
    console.log('response:', response)
    return dispatch({ type: Action.PAYMENT_MOMO, payload: response.data });

  } catch (err) {
    console.log(err)
    // return err.response.data

  }
};