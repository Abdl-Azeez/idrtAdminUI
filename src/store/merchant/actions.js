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

export const fetchMerchant = (name) => {
  return {
    type: FETCH_MERCHANT,
    payload: name,
  };
};

export const fetchMerchantSuccessful = (payload) => {
  return {
    type: FETCH_MERCHANT_SUCCESSFUL,
    payload: payload,
  };
};

export const fetchMerchantError = (error) => {
  return {
    type: FETCH_MERCHANT_ERROR,
    payload: error,
  };
};

export const updateMerchant = (payload, name) => {
  return {
    type: UPDATE_MERCHANT,
    payload: { payload, name },
  };
};

export const updateMerchantFailed = (error) => {
  return {
    type: UPDATE_MERCHANT_FAILED,
    payload: error,
  };
};

export const updateMerchantSuccessful = (payload) => {
  return {
    type: UPDATE_MERCHANT_SUCCESSFUL,
    payload,
  };
};