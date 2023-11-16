import { all } from "redux-saga/effects";

//public
import authSaga from "./auth/saga";
import MerchantSaga from "./merchant/saga"

export default function* rootSaga() {
  yield all([
    authSaga(),
    MerchantSaga()
  ]);
}
