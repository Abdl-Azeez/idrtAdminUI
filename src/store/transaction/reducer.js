import {
  FETCH_TRANSACTIONS,
  FETCH_TRANSACTIONS_SUCCESSFUL,
  FETCH_TRANSACTIONS_ERROR,
  FETCH_TRANSACTION_ADDRESS,
  FETCH_TRANSACTION_ADDRESS_SUCCESSFUL,
  FETCH_TRANSACTION_ADDRESS_ERROR,
  FETCH_TRANSACTION,
  FETCH_TRANSACTION_SUCCESSFUL,
  FETCH_TRANSACTION_ERROR,

  FETCH_ORPHAN_TRANSACTION,
  FETCH_ORPHAN_TRANSACTION_SUCCESSFUL,
  FETCH_ORPHAN_TRANSACTION_ERROR,

  FETCH_ORPHAN_LOG,
  FETCH_ORPHAN_LOG_SUCCESSFUL,
  FETCH_ORPHAN_LOG_ERROR
} from "./actionTypes";

const initialState = {
  transaction: null,
  transactions: null,
  transactionError: null,
  message: null,
  loading: false,
  transactionAddress: null,
  orphanTnx: null,
  orphanLog: null,
};

const Transaction = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_TRANSACTIONS:
      state = {
        ...state,
        transactions: null,
        transactionError: null,
        loading: true,
        message: null,
      };
      break;

    case FETCH_ORPHAN_TRANSACTION:
      state = {
        ...state,
        orphanTnx: null,
        transactionError: null,
        loading: true,
        message: null,
      };
      break;

    case FETCH_ORPHAN_LOG:
      state = {
        ...state,
        orphanLog: null,
        transactionError: null,
        loading: true,
        message: null,
      };
      break;

    case FETCH_TRANSACTION_ADDRESS:
      state = {
        ...state,
        transactionAddress: null,
        transactionError: null,
        loading: true,
        message: null,
      };
      break;

    case FETCH_TRANSACTION:
      state = {
        ...state,
        transaction: null,
        transactionError: null,
        loading: true,
        message: null,
      };
      break;

    case FETCH_TRANSACTIONS_SUCCESSFUL:
      state = {
        ...state,
        transactions: action.payload,
        message: null,
        loading: false,
        transactionError: null,
      };
      break;

    case FETCH_ORPHAN_TRANSACTION_SUCCESSFUL:
      state = {
        ...state,
        orphanTnx: action.payload,
        message: null,
        loading: false,
        transactionError: null,
      };
      break;

    case FETCH_ORPHAN_LOG_SUCCESSFUL:
      state = {
        ...state,
        orphanLog: action.payload,
        message: null,
        loading: false,
        transactionError: null,
      };
      break;

    case FETCH_TRANSACTION_SUCCESSFUL:
      state = {
        ...state,
        transaction: action.payload,
        message: null,
        loading: false,
        transactionError: null,
      };
      break;

    case FETCH_TRANSACTION_ADDRESS_SUCCESSFUL:
      state = {
        ...state,
        transactionAddress: action.payload,
        transactionError: null,
        loading: true,
        message: null,
      };
      break;

    case FETCH_TRANSACTION_ADDRESS_ERROR:
    case FETCH_TRANSACTION_ERROR:
    case FETCH_TRANSACTIONS_ERROR:
    case FETCH_ORPHAN_TRANSACTION_ERROR:
    case FETCH_ORPHAN_LOG_ERROR:
      state = {
        ...state,
        transaction: null,
        transactions: null,
        transactionAddress: null,
        loading: false,
        message: null,
        orphanLog: null,
        orphanTnx: null,
        transactionError: action.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Transaction;
