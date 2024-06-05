import { Action } from '../actions';

const initialState = {
    post: null,
    all_posts: null,
    current_post: null,
};

const PostReducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.GET_ALL_POST:
            return {
                ...state,
                all_posts: action.payload.metaData,
            };
        case Action.GET_POST_BY_TOPIC:
            return {
                ...state,
                post: action.payload.metaData,
            };
        case Action.GET_SINGLE_POST:
            return {
                ...state,
                current_post: action.payload.metaData,
            };

        default:
            return state;
    }
};

export default PostReducer;
