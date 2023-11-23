import React, { useState, useEffect, useLayoutEffect } from "react";
import Head from "../layout/head/Head";

import IncomingTnx from "../components/partials/table-partials/Transaction/IncomingTnx.js";
import OutgoingTnx from "../components/partials/table-partials/Transaction/OutgoingTnx.js";


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


  return (
    <React.Fragment>
      <Head title="Transactions"></Head>
      <IncomingTnx />
      <OutgoingTnx updatePageNumber={updatePageNumber} />

    </React.Fragment>
  );
};

export default Transactions;
