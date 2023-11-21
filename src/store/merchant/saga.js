import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import {
  LOAD_MERCHANT,
  FETCH_MERCHANT,
  UPDATE_MERCHANT,
} from "./actionTypes";

import {
  loadMerchantSuccessful,
  loadMerchantError,
  fetchMerchantSuccessful,
  fetchMerchantError,
  updateMerchantSuccessful,
  updateMerchantFailed
} from "./actions";

import {
  MerchantService,
  GetMerchantService,
  UpdateMerchantService
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

function* fetchMerchantHandler({ payload }) {
  try {
    const response = yield call(GetMerchantService, payload);
    yield put(fetchMerchantSuccessful(response.data));
  } catch (error) {
    yield put(fetchMerchantError(error?.response?.data?.message));
  }
}

function* updateMerchantHandler({ payload }) {
  try {
    const response = yield call(UpdateMerchantService, payload);

    yield put(updateMerchantSuccessful(response.data.result));
  } catch (error) {
    yield put(updateMerchantFailed(error?.response?.data?.error));
  }
}

export function* watchLoadMerchants() {
  yield takeEvery(LOAD_MERCHANT, loadMerchantHandler);
}

export function* watchFetchMerchant() {
  yield takeEvery(FETCH_MERCHANT, fetchMerchantHandler);
}

export function* watchUpdateMerchant() {
  yield takeEvery(UPDATE_MERCHANT, updateMerchantHandler);
}

function* MerchantSaga() {
  yield all([
    fork(watchLoadMerchants),
    fork(watchFetchMerchant),
    fork(watchUpdateMerchant)
  ]);
}

export default MerchantSaga;
