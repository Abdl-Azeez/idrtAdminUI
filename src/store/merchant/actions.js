import {
  LOAD_MERCHANT,
  LOAD_MERCHANT_SUCCESSFUL,
  LOAD_MERCHANT_ERROR
} from "./actionTypes";

export const loadMerchant = (payload) => {
  return {
    type: LOAD_MERCHANT,
    payload: { payload },
  };
};

export const loadMerchantSuccessful = (payload) => {
  return {
    type: LOAD_MERCHANT_SUCCESSFUL,
    payload: payload,
  };
};

export const loadMerchantError = (error) => {
  return {
    type: LOAD_MERCHANT_ERROR,
    payload: error,
  };
};