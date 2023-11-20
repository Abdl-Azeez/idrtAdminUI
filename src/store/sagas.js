import { all } from "redux-saga/effects";

//public
import authSaga from "./auth/saga";
import MerchantSaga from "./merchant/saga";
import WalletSaga from "./wallet/saga";
import TransactionSaga from "./transaction/saga";


export default function* rootSaga() {
  yield all([
    authSaga(),
    MerchantSaga(),
    WalletSaga(),
    TransactionSaga()
  ]);
}
