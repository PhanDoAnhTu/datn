import { Action } from '../actions';

const initialState = {
    brand: null,
};

const BrandReducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.GET_ALL_BRAND:
            return {
                ...state,
                brand: action.payload.metaData,
            };

        default:
            return state;
    }
};

export default BrandReducer;
