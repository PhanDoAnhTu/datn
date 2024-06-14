import { Action } from '../actions'

const initialState = {
    data: null
}

const UploadReducer = (state = initialState, action) => {

    switch (action.type) {
        case Action.UPLOAD_PRODUCT_IMAGE_LIST:
            return {
                ...state,
                data: action?.payload?.metaData
            }
        default:
            return state;
    }

}

export default UploadReducer
