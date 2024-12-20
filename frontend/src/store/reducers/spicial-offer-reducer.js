import { Action } from '../actions'

const initialState = {
    special_offer: null,
}

const Special_offerReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.SPICIAL_OFFER_BY_PRODUCT:
            return state
        case Action.SPICIAL_OFFER_TODAY:
            return {
                ...state,
                special_offer: action.payload.metaData
            }
        default:
            return state;
    }

}

export default Special_offerReducer
