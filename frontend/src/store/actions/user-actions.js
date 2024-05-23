import { GetData, PostData } from '../../utils'
import { Action } from '../actions'


export const SetAuthToken = async (tokens) => {

  tokens ? localStorage.setItem("tokens", JSON.stringify(tokens)) : localStorage.clear();

}

export const onSignup = ({ customer_email, customer_password, customer_name }) => async (dispatch) => {

  try {

    const response = await PostData('/user/v1/customer/signup', {
      customer_email, customer_password, customer_name
    });
    console.log('response:', response)
    return dispatch({ type: Action.SIGNUP, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data

  }

};

export const onLogin = ({ customer_email, customer_password }) => async (dispatch) => {

  try {

    const response = await PostData('/user/v1/customer/login', {
      customer_email, customer_password
    });
    const tokens = await response.data.metaData.tokens
    console.log("tokens", tokens)
    await SetAuthToken(tokens);

    return dispatch({ type: Action.LOGIN, payload: response.data });

  } catch (err) {
    console.error(err);
    return err.response.data
  }
};

export const onLoginWithFacebook = ({ userId, provider }) => async (dispatch) => {

  try {
    console.log(' userId, provider', userId + provider)
    const response = await PostData('/social-authentication/facebook/login-success', {
      userId, provider
    });
    const tokens = await response.data.metaData.tokens
    console.log("tokens", tokens)
    await SetAuthToken(tokens);
    return dispatch({ type: Action.LOGIN_WITH_FACEBOOK, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data

  }
};
export const onLoginWithGoogle = ({ userId, provider }) => async (dispatch) => {

  try {

    const response = await PostData('/social-authentication/google/login-success', {
      userId, provider
    });
    const tokens = await response.data.metaData.tokens
    console.log("tokens", tokens)
    await SetAuthToken(tokens);
    return dispatch({ type: Action.LOGIN_WITH_GOOGLE, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data

  }
};


export const onViewProfile = () => async (dispatch) => {

  try {

    const response = await GetData('/user/v1/customer/profile');

    return dispatch({ type: Action.PROFILE, payload: response.data });

  } catch (err) {
    console.log(err)
    return err.response.data

  }
};

export const onLogout = () => async (dispatch) => {

  try {
    const response = await PostData('/user/v1/customer/logout', {});
    return dispatch({ type: Action.LOGOUT, payload: response.data });
  } catch (err) {
    console.log(err)
    return err.response.data

  }
};