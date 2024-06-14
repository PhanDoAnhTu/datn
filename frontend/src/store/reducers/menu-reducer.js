import { Action } from '../actions';

const initialState = {
    navbar: null,
};

const MenuReducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.GET_MENU_BY_POSITION:
            return {
                ...state,
                navbar: action.payload.metaData,
            };

        default:
            return state;
    }
};

export default MenuReducer;
