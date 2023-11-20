import { takeEvery, fork, put, all, call } from "redux-saga/effects";

// Login Redux States
import {
  CHECK_LOGIN,
  LOGOUT_USER,
} from "./actionTypes";
import {
  apiError,
  authError,
  loginUserSuccessful,
  logoutUserSuccess,
} from "./actions";

import {
  LoginService,
} from "../../services/authServices";

//If user is login then dispatch redux action's are directly from here.
function* loginUser({ payload: { user, history } }) {
  try {
    const response = yield call(LoginService, user);
    // console.log(user);
    localStorage.setItem("idrtToken", JSON.stringify(response.data));
    localStorage.setItem("idrtUsername", JSON.stringify(user.name));
    document.cookie = JSON.stringify(response.data.access_token);
    yield put(loginUserSuccessful(response.data));
    // history.push("/");
  } catch (error) {
    console.log(error);
    yield put(apiError(error?.response?.data?.message));
  }
}

function* logoutUser({ payload: { history } }) {
  try {

    localStorage.removeItem("idrtToken");
    localStorage.removeItem("idrtUsername");
    yield put(logoutUserSuccess());
    history.push("/login");
  } catch (error) {
    yield put(apiError(error));
  }
}


export function* watchUserLogin() {
  yield takeEvery(CHECK_LOGIN, loginUser);
}

export function* watchUserLogout() {
  yield takeEvery(LOGOUT_USER, logoutUser);
}

function* AuthSaga() {
  yield all([
    fork(watchUserLogin),
    fork(watchUserLogout),
  ]);
}

export default AuthSaga;
