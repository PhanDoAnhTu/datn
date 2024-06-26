import { Action } from '../actions'

const initialState = {
    userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null,
    info_review_user: null
}

const UserReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.SIGNUP:
            return state
        case Action.LOGIN_WITH_FACEBOOK:
            localStorage.setItem("userInfo", JSON.stringify(action?.payload?.metaData?.customer));
            return {
                ...state,
                userInfo: action?.payload?.metaData?.customer
            }
        case Action.LOGIN_WITH_GOOGLE:
            localStorage.setItem("userInfo", JSON.stringify(action?.payload?.metaData?.customer));
            return {
                ...state,
                userInfo: action?.payload?.metaData?.customer
            }
        case Action.LOGIN:
            localStorage.setItem("userInfo", JSON.stringify(action?.payload?.metaData?.customer));
            return {
                ...state,
                userInfo: action?.payload?.metaData?.customer
            }
        case Action.UPDATE_USER:
            localStorage.setItem("userInfo", JSON.stringify(action?.payload?.metaData?.customer));
            return {
                ...state,
                userInfo: action?.payload?.metaData?.customer
            }
        case Action.PASSWORD_USER:
            return state
        case Action.NAME_AVATAR:
            return {
                ...state,
                info_review_user: action?.payload?.metaData
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
