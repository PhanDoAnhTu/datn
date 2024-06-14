import { Action } from '../actions';

const initialState = {
    attribute: null,
};

const AttributeReducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.GET_ALL_ATTRIBUTE:
            return {
                ...state,
                attribute: action.payload.metaData,
            };

        default:
            return state;
    }
};

export default AttributeReducer;
