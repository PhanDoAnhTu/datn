import { Action } from '../actions';

const initialState = {
    order: null,
    currentOrder: null,
};

const OrderReducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.GET_ALL_ORDER_BY_USER_ID:
            return {
                ...state,
                order: action.payload.metaData,
            };
        default:
            return state;
    }
};

export default OrderReducer;
