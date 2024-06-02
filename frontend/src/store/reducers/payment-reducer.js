import { Action } from '../actions';

const initialState = {
    momo: null,
    status: null,
};

const PaymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.PAYMENT_MOMO:
            // console.log(action.payload)
            return {
                ...state,
                momo: action.payload,
            };
        case Action.TRANSACTION_STATUS:
            return {
                ...state,
                status: action.payload,
            };

        default:
            return state;
    }
};

export default PaymentReducer;
