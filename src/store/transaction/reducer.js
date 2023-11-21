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

const initialState = {
  transaction: null,
  transactions: null,
  transactionError: null,
  message: null,
  loading: false,
  transactionAddress: null,
  transactionAddressOut: null,
  orphanTnx: null,
  orphanLog: null,
  incomingTnx: null,
  outgoingTnx: null,
  userTransaction: null,
  userTransactionError: null,
};

const Transaction = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_INCOMING_TRANSACTION:
    case FETCH_OUTGOING_TRANSACTION:
    case FETCH_TRANSACTIONS:
      state = {
        ...state,
        transactions: null,
        transactionError: null,
        loading: true,
        message: null,
      };
      break;

    case FETCH_USER_TRANSACTIONS:
      state = {
        ...state,
        userTransaction: null,
        userTransactionError: null,
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

    case FETCH_TRANSACTION_ADDRESS_OUT:
      state = {
        ...state,
        transactionAddressOut: null,
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

    case FETCH_INCOMING_TRANSACTION_SUCCESSFUL:
      state = {
        ...state,
        incomingTnx: action.payload,
        message: null,
        loading: false,
        transactionError: null,
      };
      break;
    case FETCH_OUTGOING_TRANSACTION_SUCCESSFUL:
      state = {
        ...state,
        outgoingTnx: action.payload,
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

    case FETCH_USER_TRANSACTIONS_SUCCESSFUL:
      state = {
        ...state,
        userTransaction: action.payload,
        message: null,
        loading: false,
        userTransactionError: null,
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

    case FETCH_TRANSACTION_ADDRESS_OUT_SUCCESSFUL:
      state = {
        ...state,
        transactionAddressOut: action.payload,
        transactionError: null,
        loading: true,
        message: null,
      };
      break;

    case FETCH_TRANSACTION_ADDRESS_ERROR:
    case FETCH_TRANSACTION_ADDRESS_OUT_ERROR:
    case FETCH_TRANSACTION_ERROR:
    case FETCH_TRANSACTIONS_ERROR:
    case FETCH_ORPHAN_TRANSACTION_ERROR:
    case FETCH_ORPHAN_LOG_ERROR:
    case FETCH_INCOMING_TRANSACTION_ERROR:
    case FETCH_OUTGOING_TRANSACTION_ERROR:
      state = {
        ...state,
        transaction: null,
        transactions: null,
        outgoingTnx: null,
        incomingTnx: null,
        transactionAddress: null,
        loading: false,
        message: null,
        orphanLog: null,
        orphanTnx: null,
        transactionAddressOut: null,
        transactionError: action.payload,
      };
      break;

    case FETCH_USER_TRANSACTIONS_ERROR:
      state = {
        ...state,
        userTransaction: null,
        loading: false,
        message: null,
        userTransactionError: action.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Transaction;
