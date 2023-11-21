import { takeEvery, fork, put, all, call } from "redux-saga/effects";

import {
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTION,
  FETCH_USER_TRANSACTIONS,
  FETCH_TRANSACTION_ADDRESS,
  FETCH_TRANSACTION_ADDRESS_OUT,
  FETCH_ORPHAN_TRANSACTION,
  FETCH_ORPHAN_LOG,
  FETCH_INCOMING_TRANSACTION,
  FETCH_OUTGOING_TRANSACTION,
} from "./actionTypes";

import {
  fetchTransactionsSuccessful,
  fetchTransactionsError,

  fetchTransactionAddressSuccessful,
  fetchTransactionAddressError,

  fetchTransactionAddressOutSuccessful,
  fetchTransactionAddressOutError,

  fetchTransactionSuccessful,
  fetchTransactionError,

  fetchUserTransactionsSuccessful,
  fetchUserTransactionsError,

  fetchOrphanSuccessful,
  fetchOrphanError,
  fetchOrphanLogSuccessful,
  fetchOrphanLogError,

  fetchIncomingTransactionSuccessful,
  fetchIncomingTransactionError,

  fetchOutgoingTransactionSuccessful,
  fetchOutgoingTransactionError,
} from "./actions";

import {
  GetTransactionAddressService,
  GetTransactionsService,
  GetEachTransactionService,
  GetOrphanTransactionService,
  GetOrphanLogService,
  GetIncomingTnxService,
  GetOutgoingTnxService,
  GetUserTransactionService
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

function* fetchIncomingTnxHandler({ payload }) {
  try {
    const response = yield call(GetIncomingTnxService, payload);
    yield put(fetchIncomingTransactionSuccessful(response.data));
  } catch (error) {
    console.log(error);
    yield put(fetchIncomingTransactionError(error?.response?.data?.message));
  }
}

function* fetchOutgoingTnxHandler({ payload }) {
  try {
    const response = yield call(GetOutgoingTnxService, payload);
    yield put(fetchOutgoingTransactionSuccessful(response.data));
  } catch (error) {
    console.log(error);
    yield put(fetchOutgoingTransactionError(error?.response?.data?.message));
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

function* fetchTransactionAddressOutHandler({ payload }) {
  try {
    // console.log(payload)
    const response = yield call(GetTransactionAddressService, payload);
    yield put(fetchTransactionAddressOutSuccessful(response.data));
  } catch (error) {
    yield put(fetchTransactionAddressOutError(error?.response?.data?.message));
  }
}

function* fetchTransactionHandler({ payload }) {
  try {
    const response = yield call(GetEachTransactionService, payload);
    yield put(fetchTransactionSuccessful(response.data));
  } catch (error) {
    yield put(fetchTransactionError(error?.response?.data?.message));
  }
}

function* fetchUserTransactionsHandler({ payload }) {
  try {
    const response = yield call(GetUserTransactionService, payload);
    yield put(fetchUserTransactionsSuccessful(response.data));
  } catch (error) {
    yield put(fetchUserTransactionsError(error?.response?.data?.message));
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

export function* watchFetchTransactionAddressOut() {
  yield takeEvery(FETCH_TRANSACTION_ADDRESS_OUT, fetchTransactionAddressOutHandler);
}

export function* watchFetchEachTransaction() {
  yield takeEvery(FETCH_TRANSACTION, fetchTransactionHandler);
}

export function* watchFetchUserTransactions() {
  yield takeEvery(FETCH_USER_TRANSACTIONS, fetchUserTransactionsHandler);
}

export function* watchFetchOrphaTransaction() {
  yield takeEvery(FETCH_ORPHAN_TRANSACTION, fetchOrphanHandler);
}

export function* watchFetchOrphaLog() {
  yield takeEvery(FETCH_ORPHAN_LOG, fetchOrphanLogHandler);
}

export function* watchFetchIncomingTnx() {
  yield takeEvery(FETCH_INCOMING_TRANSACTION, fetchIncomingTnxHandler);
}

export function* watchFetchOutgoingTnx() {
  yield takeEvery(FETCH_OUTGOING_TRANSACTION, fetchOutgoingTnxHandler);
}

function* TransactionsSaga() {
  yield all([
    fork(watchFetchTransactions),
    fork(watchFetchTransactionAddress),
    fork(watchFetchEachTransaction),
    fork(watchFetchOrphaTransaction),
    fork(watchFetchOrphaLog),
    fork(watchFetchIncomingTnx),
    fork(watchFetchOutgoingTnx),
    fork(watchFetchUserTransactions),
    fork(watchFetchTransactionAddressOut)
  ]);
}

export default TransactionsSaga;
