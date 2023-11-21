import {
  FETCH_WALLET,
  FETCH_WALLET_SUCCESSFUL,
  FETCH_WALLET_ERROR,

  FETCH_WALLET_BALANCE,
  FETCH_WALLET_BALANCE_SUCCESSFUL,
  FETCH_WALLET_BALANCE_ERROR,

  FETCH_WALLET_HISTORY,
  FETCH_WALLET_HISTORY_SUCCESSFUL,
  FETCH_WALLET_HISTORY_ERROR
} from "./actionTypes";

export const fetchWallet = (payload) => {
  return {
    type: FETCH_WALLET,
    payload: { payload },
  };
};

export const fetchWalletSuccessful = (payload) => {
  return {
    type: FETCH_WALLET_SUCCESSFUL,
    payload: payload,
  };
};

export const fetchWalletError = (error) => {
  return {
    type: FETCH_WALLET_ERROR,
    payload: error,
  };
};

export const fetchWalletBalance = (address) => {
  return {
    type: FETCH_WALLET_BALANCE,
    payload: address,
  };
};

export const fetchWalletBalanceSuccessful = (payload) => {
  return {
    type: FETCH_WALLET_BALANCE_SUCCESSFUL,
    payload: payload,
  };
};

export const fetchWalletBalanceError = (error) => {
  return {
    type: FETCH_WALLET_BALANCE_ERROR,
    payload: error,
  };
};

export const fetchWalletHistory = (id) => {
  return {
    type: FETCH_WALLET_HISTORY,
    payload: id,
  };
};

export const fetchWalletHistorySuccessful = (payload) => {
  return {
    type: FETCH_WALLET_HISTORY_SUCCESSFUL,
    payload: payload,
  };
};

export const fetchWalletHistoryError = (error) => {
  return {
    type: FETCH_WALLET_HISTORY_ERROR,
    payload: error,
  };
};