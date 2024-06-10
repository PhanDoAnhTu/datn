import { Action } from '../actions'

const initialState = {
    spicial_offer: null,
}

const UserReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.SPICIAL_OFFER_BY_PRODUCT:
            return state


        default:
            return state;
    }

}

export default UserReducer
