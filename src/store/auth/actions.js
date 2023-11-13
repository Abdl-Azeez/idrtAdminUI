import {
  CHECK_LOGIN,
  LOGIN_USER_SUCCESSFUL,
  API_ERROR,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESSFULLY,
  AUTH_ERROR,
} from "./actionTypes";

export const checkLogin = (user, history) => {
  return {
    type: CHECK_LOGIN,
    payload: { user, history },
  };
};


export const loginUserSuccessful = (token) => {
  return {
    type: LOGIN_USER_SUCCESSFUL,
    payload: token,
  };
};

export const apiError = (error) => {
  return {
    type: API_ERROR,
    payload: error,
  };
};



export const authError = (error) => {
  return {
    type: AUTH_ERROR,
    // payload: error,
  };
};

export const logoutUser = (history) => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  };
};

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESSFULLY,
    payload: {},
  };
};
