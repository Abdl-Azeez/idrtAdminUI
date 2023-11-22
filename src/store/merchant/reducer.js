import {
  LOAD_MERCHANT,
  LOAD_MERCHANT_SUCCESSFUL,
  LOAD_MERCHANT_ERROR,
  FETCH_MERCHANT,
  FETCH_MERCHANT_SUCCESSFUL,
  FETCH_MERCHANT_ERROR,
  UPDATE_MERCHANT,
  UPDATE_MERCHANT_SUCCESSFUL,
  UPDATE_MERCHANT_FAILED,
} from "./actionTypes";

const initialState = {
  merchants: null,
  merchant: null,
  merchantError: null,
  merchantsError: null,
  message: null,
  loading: false,
};

const Merchant = (state = initialState, action) => {
  switch (action.type) {

    case LOAD_MERCHANT:
    case UPDATE_MERCHANT:
      state = {
        ...state,
        // merchants: null,
        merchantsError: null,
        loading: true,
        message: null,
      };
      break;

    case LOAD_MERCHANT_SUCCESSFUL:
      state = {
        ...state,
        merchants: action.payload,
        message: null,
        loading: false,
        merchantsError: null,
      };
      break;
    case UPDATE_MERCHANT_SUCCESSFUL:
      state = {
        ...state,
        loading: false,
        merchantsError: null,
        message: 'Merchant Updated Successfully',
      };
      break;
    case LOAD_MERCHANT_ERROR:
      state = {
        ...state,
        merchants: false,
        loading: false,
        message: null,
        merchantsError: action.payload,
      };
      break;


    case FETCH_MERCHANT:
      state = {
        ...state,
        merchant: null,
        merchantError: null,
        loading: true,
        message: null,
      };
      break;

    case FETCH_MERCHANT_SUCCESSFUL:
      state = {
        ...state,
        merchant: action.payload,
        message: null,
        loading: false,
        merchantError: null,
      };
      break;

    case UPDATE_MERCHANT_FAILED:
    case FETCH_MERCHANT_ERROR:
      state = {
        ...state,
        merchant: null,
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
