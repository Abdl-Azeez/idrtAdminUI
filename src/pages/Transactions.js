import React, { useState, useEffect, useLayoutEffect } from "react";
import Head from "../layout/head/Head";

import IncomingTnx from "../components/partials/table-partials/Transaction/IncomingTnx.js";
import OutgoingTnx from "../components/partials/table-partials/Transaction/OutgoingTnx.js";
import AgentTxn from "../components/partials/table-partials/Transaction/AgentTxn.js";


const Transactions = () => {

  const [pageNumber, setPageNumber] = useState(true);

  const updatePageNumber = () => {
    setPageNumber(false)
  }
  useLayoutEffect(() => {
    if (pageNumber) {
      window.scrollTo(0, 0);
    }
  });
  let role = localStorage.getItem("idrtRole") ? JSON.parse(localStorage.getItem("idrtRole")) : null



  return (
    <React.Fragment>
      <Head title="Transactions"></Head>
      {role === "AGENT" && <AgentTxn role={role} />}
      <IncomingTnx role={role} />
      <OutgoingTnx updatePageNumber={updatePageNumber} role={role} />

    </React.Fragment>
  );
};

export default Transactions;
