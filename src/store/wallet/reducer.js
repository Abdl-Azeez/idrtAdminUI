import {
  FETCH_WALLET,
  FETCH_WALLET_SUCCESSFUL,
  FETCH_WALLET_ERROR,
  FETCH_WALLET_BALANCE,
  FETCH_WALLET_BALANCE_SUCCESSFUL,
  FETCH_WALLET_BALANCE_ERROR
} from "./actionTypes";

const initialState = {
  wallet: null,
  walletError: null,
  message: null,
  loading: false,
  walletBalance: null,
};

const Wallet = (state = initialState, action) => {
  switch (action.type) {

    case FETCH_WALLET:
      state = {
        ...state,
        wallet: null,
        walletError: null,
        loading: true,
        message: null,
      };
      break;

    case FETCH_WALLET_BALANCE:
      state = {
        ...state,
        walletBalance: null,
        walletError: null,
        loading: true,
        message: null,
      };
      break;

    case FETCH_WALLET_SUCCESSFUL:
      state = {
        ...state,
        wallet: action.payload,
        message: null,
        loading: false,
        walletError: null,
      };
      break;

    case FETCH_WALLET_BALANCE_SUCCESSFUL:
      state = {
        ...state,
        walletBalance: action.payload,
        walletError: null,
        loading: true,
        message: null,
      };
      break;

    case FETCH_WALLET_BALANCE_ERROR:
    case FETCH_WALLET_ERROR:
      state = {
        ...state,
        wallet: null,
        walletBalance: null,
        loading: false,
        message: null,
        walletError: action.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Wallet;
