import {
  LOGOUT_USER,
  CHECK_LOGIN,
  LOGIN_USER_SUCCESSFUL,
  LOGOUT_USER_SUCCESSFULLY,
  API_ERROR,
  AUTH_ERROR,
} from "./actionTypes";
import { checkAuthTokens } from '../../utils/axiosInstance';

const initialState = {
  user: null,
  loginError: null,
  activationError: null,
  isAuthenticated: checkAuthTokens() ? true : false,
  message: null,
  loading: false,
};

const Auth = (state = initialState, action) => {
  switch (action.type) {
    case CHECK_LOGIN:
      state = {
        ...state,
        loginError: null,
        loading: true,
        activationError: null,
        isAuthenticated: false,
      };
      break;
    case LOGIN_USER_SUCCESSFUL:
      state = {
        ...state,
        token: action.payload,
        loading: false,
        activationError: null,
        isAuthenticated: true,
      };
      break;

    case LOGOUT_USER:
      state = { ...state, loading: true, user: null };
      break;

    case LOGOUT_USER_SUCCESSFULLY:
      state = {
        ...state,
        token: null,
        user: null,
        loginError: null,
        activationError: null,
        isAuthenticated: false,
        message: null,
        loading: false,
      };
      break;



    case API_ERROR:
      state = {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        message: null,
        loginError: action.payload,
        activationError: null,
      };
      break;

    case AUTH_ERROR:
      localStorage.removeItem("idrtToken");
      state = {
        ...state,
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
        message: null,
        loginError: action.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Auth;
