import {
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTIONS_SUCCESSFUL,
  FETCH_TRANSACTIONS_ERROR,

  FETCH_TRANSACTION_ADDRESS,
  FETCH_TRANSACTION_ADDRESS_SUCCESSFUL,
  FETCH_TRANSACTION_ADDRESS_ERROR,

  FETCH_TRANSACTION_ADDRESS_OUT,
  FETCH_TRANSACTION_ADDRESS_OUT_SUCCESSFUL,
  FETCH_TRANSACTION_ADDRESS_OUT_ERROR,

  FETCH_TRANSACTION,
  FETCH_TRANSACTION_SUCCESSFUL,
  FETCH_TRANSACTION_ERROR,

  FETCH_USER_TRANSACTIONS,
  FETCH_USER_TRANSACTIONS_SUCCESSFUL,
  FETCH_USER_TRANSACTIONS_ERROR,

  FETCH_ORPHAN_TRANSACTION,
  FETCH_ORPHAN_TRANSACTION_SUCCESSFUL,
  FETCH_ORPHAN_TRANSACTION_ERROR,

  FETCH_ORPHAN_LOG,
  FETCH_ORPHAN_LOG_SUCCESSFUL,
  FETCH_ORPHAN_LOG_ERROR,

  FETCH_INCOMING_TRANSACTION,
  FETCH_INCOMING_TRANSACTION_SUCCESSFUL,
  FETCH_INCOMING_TRANSACTION_ERROR,

  FETCH_OUTGOING_TRANSACTION,
  FETCH_OUTGOING_TRANSACTION_SUCCESSFUL,
  FETCH_OUTGOING_TRANSACTION_ERROR,
} from "./actionTypes";

export const fetchTransactions = (payload) => {
  return {
    type: FETCH_TRANSACTIONS,
    payload: payload,
  };
};

export const fetchTransactionsSuccessful = (payload) => {
  return {
    type: FETCH_TRANSACTIONS_SUCCESSFUL,
    payload: payload,
  };
};

export const fetchTransactionsError = (error) => {
  return {
    type: FETCH_TRANSACTIONS_ERROR,
    payload: error,
  };
};


export const fetchTransaction = (id) => {
  return {
    type: FETCH_TRANSACTION,
    payload: id,
  };
};

export const fetchTransactionSuccessful = (payload) => {
  return {
    type: FETCH_TRANSACTION_SUCCESSFUL,
    payload: payload,
  };
};

export const fetchTransactionError = (error) => {
  return {
    type: FETCH_TRANSACTION_ERROR,
    payload: error,
  };
};

export const fetchUserTransactions = (id) => {
  return {
    type: FETCH_USER_TRANSACTIONS,
    payload: id,
  };
};

export const fetchUserTransactionsSuccessful = (payload) => {
  return {
    type: FETCH_USER_TRANSACTIONS_SUCCESSFUL,
    payload: payload,
  };
};

export const fetchUserTransactionsError = (error) => {
  return {
    type: FETCH_USER_TRANSACTIONS_ERROR,
    payload: error,
  };
};


export const fetchTransactionAddress = (payload) => {
  return {
    type: FETCH_TRANSACTION_ADDRESS,
    payload: payload,
  };
};

export const fetchTransactionAddressSuccessful = (payload) => {
  return {
    type: FETCH_TRANSACTION_ADDRESS_SUCCESSFUL,
    payload: payload,
  };
};

export const fetchTransactionAddressError = (error) => {
  return {
    type: FETCH_TRANSACTION_ADDRESS_ERROR,
    payload: error,
  };
};

export const fetchTransactionAddressOut = (payload) => {
  return {
    type: FETCH_TRANSACTION_ADDRESS_OUT,
    payload: payload,
  };
};

export const fetchTransactionAddressOutSuccessful = (payload) => {
  return {
    type: FETCH_TRANSACTION_ADDRESS_OUT_SUCCESSFUL,
    payload: payload,
  };
};

export const fetchTransactionAddressOutError = (error) => {
  return {
    type: FETCH_TRANSACTION_ADDRESS_OUT_ERROR,
    payload: error,
  };
};


export const fetchOrphan = (payload) => {
  return {
    type: FETCH_ORPHAN_TRANSACTION,
    payload: payload,
  };
};

export const fetchOrphanSuccessful = (payload) => {
  return {
    type: FETCH_ORPHAN_TRANSACTION_SUCCESSFUL,
    payload: payload,
  };
};

export const fetchOrphanError = (error) => {
  return {
    type: FETCH_ORPHAN_TRANSACTION_ERROR,
    payload: error,
  };
};


export const fetchOrphanLog = (payload) => {
  return {
    type: FETCH_ORPHAN_LOG,
    payload: { payload },
  };
};

export const fetchOrphanLogSuccessful = (payload) => {
  return {
    type: FETCH_ORPHAN_LOG_SUCCESSFUL,
    payload: payload,
  };
};

export const fetchOrphanLogError = (error) => {
  return {
    type: FETCH_ORPHAN_LOG_ERROR,
    payload: error,
  };
};

export const fetchIncomingTnx = (payload) => {
  return {
    type: FETCH_INCOMING_TRANSACTION,
    payload: payload,
  };
};

export const fetchIncomingTransactionSuccessful = (payload) => {
  return {
    type: FETCH_INCOMING_TRANSACTION_SUCCESSFUL,
    payload: payload,
  };
};

export const fetchIncomingTransactionError = (error) => {
  return {
    type: FETCH_INCOMING_TRANSACTION_ERROR,
    payload: error,
  };
};

export const fetchOutgoingTnx = (payload) => {
  return {
    type: FETCH_OUTGOING_TRANSACTION,
    payload: payload,
  };
};

export const fetchOutgoingTransactionSuccessful = (payload) => {
  return {
    type: FETCH_OUTGOING_TRANSACTION_SUCCESSFUL,
    payload: payload,
  };
};

export const fetchOutgoingTransactionError = (error) => {
  return {
    type: FETCH_OUTGOING_TRANSACTION_ERROR,
    payload: error,
  };
};