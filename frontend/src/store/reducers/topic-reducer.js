import { Action } from '../actions';

const initialState = {
    topic: null,
};

const TopicReducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.GET_ALL_TOPIC:
            localStorage.setItem(
                'topics',
                JSON.stringify(action.payload.metaData)
            );
            return {
                ...state,
                topic: action.payload.metaData,
            };

        default:
            return state;
    }
};

export default TopicReducer;
