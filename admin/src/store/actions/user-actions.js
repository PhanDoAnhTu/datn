import { GetData, PostData } from "../../utils/apicall";
import { Action } from "../actions";

export const SetAuthToken = async (tokens) => {
  if (tokens) {
    localStorage.setItem("tokens", JSON.stringify(tokens))
  } else {
    localStorage.removeItem('tokens')
    localStorage.removeItem('userInfo')
  }

}
export const onLogin =
  ({ staff_email,
    staff_password, }) =>
    async (dispatch) => {
      try {
        const response = await PostData("/user/v1/staff/login", {
          staff_email,
          staff_password,
        });
        const tokens = await response.data.metaData.tokens;
        console.log("tokens", tokens);
        await SetAuthToken(tokens);

        return dispatch({ type: Action.LOGIN, payload: response.data });
      } catch (err) {
        console.error(err);
        return err.response.data;
      }
    };

export const onLoginWithFacebook =
  ({ userId, provider }) =>
    async (dispatch) => {
      try {
        // console.log(" userId, provider", userId + provider);
        const response = await PostData(
          "/social-authentication/facebook/login-success",
          {
            userId,
            provider,
          }
        );
        const tokens = await response.data.metaData.tokens;
        console.log("tokens", tokens);
        await SetAuthToken(tokens);
        return dispatch({
          type: Action.LOGIN_WITH_FACEBOOK,
          payload: response.data,
        });
      } catch (err) {
        console.log(err);
        return err.response.data;
      }
    };
export const onLoginWithGoogle =
  ({ userId, provider }) =>
    async (dispatch) => {
      try {
        const response = await PostData(
          "/social-authentication/google/login-success",
          {
            userId,
            provider,
          }
        );
        const tokens = await response.data.metaData.tokens;
        console.log("tokens", tokens);
        await SetAuthToken(tokens);
        return dispatch({
          type: Action.LOGIN_WITH_GOOGLE,
          payload: response.data,
        });
      } catch (err) {
        console.log(err);
        return err.response.data;
      }
    };

export const onViewProfile = () => async (dispatch) => {
  try {
    const response = await GetData("/user/v1/staff/profile");

    return dispatch({ type: Action.PROFILE, payload: response.data });
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export const onLogout = () => async (dispatch) => {
  try {
    SetAuthToken()
    const response = await PostData("/user/v1/staff/logout", {});
    return dispatch({ type: Action.LOGOUT, payload: response.data });
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export const getAllCustomers = () => async (dispatch) => {
  try {
    const response = await GetData(
      "/user/v1/customer/getNameAndAvatarCustomer"
    );
    return dispatch({ type: Action.GET_ALL_CUSTOMER, payload: response.data });
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

export const findCustomerById = (data) => async (dispatch) => {
  try {
    const response = await PostData("/user/v1/customer/findCustomerById", data);
    return dispatch({
      type: Action.FIND_CUSTOMER_BY_ID,
      payload: response.data,
    });
  } catch (err) {
    console.log("im here");
    return err.response.data;
  }
};

export const updateCustomerStatus = (data) => async (dispatch) => {
  try {
    const response = await PostData(
      "/user/v1/customer/updateCustomerStatus",
      data
    );
    return dispatch({
      type: Action.CHANGE_CUSTOMER_STATUS,
      payload: response.data,
    });
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};
