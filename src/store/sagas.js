import { all } from "redux-saga/effects";

//public
import authSaga from "./auth/saga";

export default function* rootSaga() {
  yield all([authSaga()]);
}
