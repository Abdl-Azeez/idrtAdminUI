import { GENERAL_TOAST, GENERAL_TOAST_SUCCESSFUL, GENERAL_TOAST_ERROR } from "./actionTypes";

const initialState = {
  error: null,
  toastMessage: null,
  toastType: null,
};

const GeneralToast = (state = initialState, action) => {
  switch (action.type) {
    case GENERAL_TOAST:
      state = {
        ...state,
        error: null,
        toastMessage: null,
        toastType: null,
      };
      break;
    case GENERAL_TOAST_SUCCESSFUL:
      state = {
        ...state,
        error: action.payload.error,
        toastMessage: action.payload.message,
        toastType: action.payload.type,
      };
      break;
    case GENERAL_TOAST_ERROR:
      state = {
        ...state,
        error: null,
        toastMessage: null,
        toastType: null,
      };
      break;

    default:
      state = { ...state };
      break;
  }
  return state;
};

export default GeneralToast;
