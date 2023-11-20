import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import {
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTION,
  FETCH_TRANSACTION_ADDRESS,
  FETCH_ORPHAN_TRANSACTION,
  FETCH_ORPHAN_LOG
} from "./actionTypes";

import {
  fetchTransactionsSuccessful,
  fetchTransactionsError,
  fetchTransactionAddressSuccessful,
  fetchTransactionAddressError,
  fetchTransactionSuccessful,
  fetchTransactionError,
  fetchOrphanSuccessful,
  fetchOrphanError,
  fetchOrphanLogSuccessful,
  fetchOrphanLogError
} from "./actions";

import {
  GetTransactionAddressService,
  GetTransactionsService,
  GetEachTransactionService,
  GetOrphanTransactionService,
  GetOrphanLogService
} from "../../services/transactionService";

function* fetchTransactionsHandler() {
  try {
    const response = yield call(GetTransactionsService);
    yield put(fetchTransactionsSuccessful(response.data));
  } catch (error) {
    console.log(error);
    yield put(fetchTransactionsError(error?.response?.data?.message));
  }
}

function* fetchTransactionAddressHandler({ payload }) {
  try {
    // console.log(payload)
    const response = yield call(GetTransactionAddressService, payload);
    yield put(fetchTransactionAddressSuccessful(response.data));
  } catch (error) {
    yield put(fetchTransactionAddressError(error?.response?.data?.message));
  }
}

function* fetchTransactionHandler({ payload }) {
  try {
    // console.log(payload)
    const response = yield call(GetEachTransactionService, payload);
    yield put(fetchTransactionSuccessful(response.data));
  } catch (error) {
    yield put(fetchTransactionError(error?.response?.data?.message));
  }
}

function* fetchOrphanHandler() {
  try {
    const response = yield call(GetOrphanTransactionService);
    yield put(fetchOrphanSuccessful(response.data));
  } catch (error) {
    console.log(error);
    yield put(fetchOrphanError(error?.response?.data?.message));
  }
}

function* fetchOrphanLogHandler() {
  try {
    const response = yield call(GetOrphanLogService);
    yield put(fetchOrphanLogSuccessful(response.data));
  } catch (error) {
    console.log(error);
    yield put(fetchOrphanLogError(error?.response?.data?.message));
  }
}



export function* watchFetchTransactions() {
  yield takeEvery(FETCH_TRANSACTIONS, fetchTransactionsHandler);
}

export function* watchFetchTransactionAddress() {
  yield takeEvery(FETCH_TRANSACTION_ADDRESS, fetchTransactionAddressHandler);
}

export function* watchFetchEachTransaction() {
  yield takeEvery(FETCH_TRANSACTION, fetchTransactionHandler);
}

export function* watchFetchOrphaTransaction() {
  yield takeEvery(FETCH_ORPHAN_TRANSACTION, fetchOrphanHandler);
}

export function* watchFetchOrphaLog() {
  yield takeEvery(FETCH_ORPHAN_LOG, fetchOrphanLogHandler);
}

function* TransactionsSaga() {
  yield all([
    fork(watchFetchTransactions),
    fork(watchFetchTransactionAddress),
    fork(watchFetchEachTransaction),
    fork(watchFetchOrphaTransaction),
    fork(watchFetchOrphaLog)
  ]);
}

export default TransactionsSaga;
