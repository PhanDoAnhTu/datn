import { Action } from '../actions';

const initialState = {
    momo: null,
    status: null,
};

const PaymentReducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.PAYMENT_MOMO:
            return {
                ...state,
                momo: action.payload.data,
            };
        case Action.transaction_status:
            return {
                ...state,
                status: action.payload,
            };

        default:
            return state;
    }
};

export default PaymentReducer;
