import { combineReducers } from "redux";

import General from "./general/reducer";

const rootReducer = combineReducers({
  General,
});

export default rootReducer;
