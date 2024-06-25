import { Action } from "../actions";

const initialState = {
  all_contact: null,
  current_contact: null,
};

const ContactReducer = (state = initialState, action) => {
  switch (action.type) {
    case Action.ALL_CONTACT:
      return {
        ...state,
        all_contact: action.payload.metaData,
      };
    case Action.FIND_CONTACT:
      return {
        ...state,
        current_contact: action.payload.metaData,
      };

    default:
      return state;
  }
};

export default ContactReducer;
