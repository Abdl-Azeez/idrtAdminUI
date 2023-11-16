import {
  LOAD_MERCHANT,
  LOAD_MERCHANT_SUCCESSFUL,
  LOAD_MERCHANT_ERROR
} from "./actionTypes";

const initialState = {
  merchant: null,
  merchantError: null,
  message: null,
  loading: false,
};

const Merchant = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_MERCHANT:
      state = {
        ...state,
        merchant: null,
        merchantError: null,
        loading: true,
        message: null,
      };
      break;

    case LOAD_MERCHANT_SUCCESSFUL:
      state = {
        ...state,
        merchant: action.payload,
        message: null,
        loading: false,
        merchantError: null,
      };
      break;

    case LOAD_MERCHANT_ERROR:
      state = {
        ...state,
        merchant: false,
        loading: false,
        message: null,
        merchantError: action.payload,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default Merchant;
