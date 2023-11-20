import React, { useState, useEffect } from "react";
import Head from "../layout/head/Head";

import IncomingTnx from "../components/partials/table-partials/Transaction/IncomingTnx.js";
import OutgoingTnx from "../components/partials/table-partials/Transaction/OutgoingTnx.js";


const Transactions = () => {


  return (
    <React.Fragment>
      <Head title="Transactions"></Head>
      <IncomingTnx />
      <OutgoingTnx />

    </React.Fragment>
  );
};

export default Transactions;
