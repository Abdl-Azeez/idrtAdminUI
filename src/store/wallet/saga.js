import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import {
  FETCH_WALLET,
  FETCH_WALLET_BALANCE,
} from "./actionTypes";

import {
  fetchWalletSuccessful,
  fetchWalletError,
  fetchWalletBalanceSuccessful,
  fetchWalletBalanceError,
} from "./actions";

import {
  WalletBalanceService,
  WalletService,
} from "../../services/walletService";

function* fetchWalletHandler() {
  try {
    const response = yield call(WalletService);
    yield put(fetchWalletSuccessful(response.data));
  } catch (error) {
    console.log(error);
    yield put(fetchWalletError(error?.response?.data?.message));
  }
}

function* fetchWalletBalanceHandler({ payload }) {
  try {
    // console.log(payload)
    const response = yield call(WalletBalanceService, payload);
    yield put(fetchWalletBalanceSuccessful(response.data));
  } catch (error) {
    yield put(fetchWalletBalanceError(error?.response?.data?.message));
  }
}

export function* watchFetchWallet() {
  yield takeEvery(FETCH_WALLET, fetchWalletHandler);
}

export function* watchFetchWalletBalance() {
  yield takeEvery(FETCH_WALLET_BALANCE, fetchWalletBalanceHandler);
}

function* WalletSaga() {
  yield all([
    fork(watchFetchWallet),
    fork(watchFetchWalletBalance)
  ]);
}

export default WalletSaga;
