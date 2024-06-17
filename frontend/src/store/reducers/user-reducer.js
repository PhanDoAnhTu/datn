import { Action } from '../actions'

const initialState = {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
}

const UserReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.SIGNUP:
            return state
        case Action.LOGIN_WITH_FACEBOOK:
            localStorage.setItem("userInfo", JSON.stringify(action.payload.metaData.customer));
            return {
                ...state,
                userInfo: action.payload
            }
        case Action.LOGIN_WITH_GOOGLE:
            localStorage.setItem("userInfo", JSON.stringify(action.payload.metaData.customer));
            return {
                ...state,
                userInfo: action.payload
            }
        case Action.LOGIN:
            localStorage.setItem("userInfo", JSON.stringify(action.payload.metaData.customer));
            return {
                ...state,
                userInfo: action.payload
            }
        case Action.LOGOUT:
            return {
                ...state,
                userInfo: null
            }

        default:
            return state;
    }

}

export default UserReducer
