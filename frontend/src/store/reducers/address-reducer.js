import { Action } from '../actions';

const initialState = {
    address: [],
    addressDefault: null
};

const AddressReducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.GET_ADDRESS:
            return {
                ...state,
                address: action.payload.metaData,
            };
        case Action.ADDRESS_DEFAULT:
            return {
                ...state,
                addressDefault: action.payload.metaData,
            };

        default:
            return state;
    }
};

export default AddressReducer;
