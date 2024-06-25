
import { PostData } from '../../utils/apicall'
import { Action } from './index'


export const findOneContact = (data) => async (dispatch) => {
    try {
        const response = await PostData('/contact/v1/findOneContact', data);
        console.log('response:', response)
        return dispatch({ type: Action.FIND_CONTACT, payload: response.data });
    } catch (err) {
        console.log(err)
        return err.response.data
    }
};
export const getAllContact = (data) => async (dispatch) => {
    try {
        const response = await PostData('/contact/v1/getAllContact', data);
        console.log('response:', response)
        return dispatch({ type: Action.ALL_CONTACT, payload: response.data });
    } catch (err) {
        console.log(err)
        return err.response.data
    }
};


export const newContact = (data) => async (dispatch) => {
    try {
        const response = await PostData('/contact/v1/newContact', data);
        console.log('response:', response)
        return dispatch({ type: Action.NEW_CONTACT, payload: response.data });
    } catch (err) {
        console.log(err)
        return err.response.data
    }
};
export const findIsReply = (data) => async (dispatch) => {
    try {
        const response = await PostData('/contact/v1/findIsReply', data);
        console.log('response:', response)
        return dispatch({ type: Action.FIND_CONTACT, payload: response.data });
    } catch (err) {
        console.log(err)
        return err.response.data
    }
};




// router.post("/findOneContact", asynchandler(ContactController.findOneContact));
// router.post("/getAllContact", asynchandler(ContactController.getAllContact));
// router.post("/newContact", asynchandler(ContactController.newContact));
// router.post("/findIsReply", asynchandler(ContactController.findIsReply));
