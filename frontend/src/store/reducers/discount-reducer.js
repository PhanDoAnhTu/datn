import { Action } from '../actions';

const initialState = {
    discount: null,
};

const DiscountReducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.GET_ALL_DISCOUNT:
            return {
                ...state,
                discount: action.payload.metaData,
            };

        default:
            return state;
    }
};

export default DiscountReducer;
