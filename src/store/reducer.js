import { combineReducers } from "redux";

import Auth from "./auth/reducer";
import General from "./general/reducer";

const rootReducer = combineReducers({
  Auth,
  General,
});

export default rootReducer;
