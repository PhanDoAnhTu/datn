import { Action } from '../actions'

const initialState = {
    momo: null
}

const PaymentReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.PAYMENT_MOMO:
            return {
                ...state,
                momo: action.payload
            }
      
        default:
            return state;
    }

}

export default PaymentReducer
