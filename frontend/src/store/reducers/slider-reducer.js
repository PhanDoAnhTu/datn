import { Action } from '../actions';

const initialState = {
    slider: null,
};

const SliderReducer = (state = initialState, action) => {
    switch (action.type) {
        case Action.GET_ALL_SLIDER_BY_ACTIVE:
            localStorage.setItem(
                'sliders',
                JSON.stringify(action.payload.metaData)
            );
            return {
                ...state,
                slider: action.payload.metaData,
            };

        default:
            return state;
    }
};

export default SliderReducer;
