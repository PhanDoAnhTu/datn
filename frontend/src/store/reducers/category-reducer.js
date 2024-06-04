import { Action } from '../actions';

const initialState = {
    category: null,
};

const CategoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.GET_CATEGORY_BY_PARENT_ID:
            localStorage.setItem(
                'category_list',
                JSON.stringify(action.payload)
            );
            return {
                ...state,
                category: action.payload.metaData,
            };
        case Action.GET_ALL_CATEGORY:
            localStorage.setItem(
                'category_list',
                JSON.stringify(action.payload.metaData)
            );
            return {
                ...state,
                category: action.payload.metaData,
            };

        default:
            return state;
    }
};

export default CategoryReducer;
