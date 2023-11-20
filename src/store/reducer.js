import { combineReducers } from "redux";

import Auth from "./auth/reducer";
import General from "./general/reducer";
import Merchant from "./merchant/reducer";
import Wallet from "./wallet/reducer";
import Transaction from "./transaction/reducer";

const rootReducer = combineReducers({
  Auth,
  General,
  Merchant,
  Wallet,
  Transaction
});

export default rootReducer;
