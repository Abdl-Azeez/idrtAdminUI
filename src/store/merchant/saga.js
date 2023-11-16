import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import {
  LOAD_MERCHANT,
} from "./actionTypes";

import {
  loadMerchantSuccessful,
  loadMerchantError,
} from "./actions";

import {
  MerchantService,
} from "../../services/merchantService";

function* loadMerchantHandler() {
  try {
    const response = yield call(MerchantService);
    yield put(loadMerchantSuccessful(response.data));
  } catch (error) {
    console.log(error);
    yield put(loadMerchantError(error?.response?.data?.message));
  }
}

export function* watchLoadMerchant() {
  yield takeEvery(LOAD_MERCHANT, loadMerchantHandler);
}

function* MerchantSaga() {
  yield all([
    fork(watchLoadMerchant),
  ]);
}

export default MerchantSaga;
