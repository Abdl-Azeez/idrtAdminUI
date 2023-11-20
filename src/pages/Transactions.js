import React, { useState, useEffect } from "react";
import Head from "../layout/head/Head";

import { fetchTransactions, generalToastError } from "../store/actions";
import { useSelector, useDispatch } from "react-redux";
import IncomingTnx from "../components/partials/table-partials/Transaction/IncomingTnx.js";
import OutgoingTnx from "../components/partials/table-partials/Transaction/OutgoingTnx.js";


const Transactions = () => {
  const { transactions, transactionError } = useSelector((state) => state.Transaction);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTransactions());
  }, [dispatch]);

  useEffect(() => {
    if (transactionError) {
      setTimeout(() => {
        dispatch(generalToastError(transactionError));
      }, 2000);
    }
  }, [transactionError]);

  console.log(transactions)
  return (
    <React.Fragment>
      <Head title="Transactions"></Head>
      <IncomingTnx transactions={transactions} />
      <OutgoingTnx transactions={transactions} />

    </React.Fragment>
  );
};

export default Transactions;
