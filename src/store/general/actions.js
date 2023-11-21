import { GENERAL_TOAST, GENERAL_TOAST_SUCCESSFUL, GENERAL_TOAST_ERROR, ERROR_CHECKER } from "./actionTypes";


export const generalToast = (payload) => {
  return {
    type: GENERAL_TOAST,
    payload,
  };
};

export const generalToastSuccessfully = (payload) => {
  return {
    type: GENERAL_TOAST_SUCCESSFUL,
    payload,
  };
};

export const generalToastError = (payload) => {
  return {
    type: GENERAL_TOAST_ERROR,
    payload,
  };
};



export const errorChecker = (message) => ({
  type: ERROR_CHECKER,
  payload: { message },
});