import { GENERAL_TOAST, GENERAL_TOAST_SUCCESSFUL, GENERAL_TOAST_ERROR } from "./actionTypes";

// Get Inspection
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
