import { combineReducers } from "redux";

import Auth from "./auth/reducer";
import General from "./general/reducer";
import Merchant from "./merchant/reducer"

const rootReducer = combineReducers({
  Auth,
  General,
  Merchant
});

export default rootReducer;
