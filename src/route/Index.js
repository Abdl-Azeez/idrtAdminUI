import React, { Suspense, useLayoutEffect } from "react";
import { Switch } from "react-router-dom";
import Routes from "./routes"
import { RedirectAs404 } from "../utils/Utils";
import Homepage from "../pages/Homepage";
import Transactions from "../pages/Transactions";
import Users from "../pages/Users";
import Wallets from "../pages/Wallets";



const Pages = () => {
  useLayoutEffect(() => {
    window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<div />}>
      <Switch>
        <Routes exact path={`${process.env.PUBLIC_URL}/transactions`} component={Transactions}></Routes>
        <Routes exact path={`${process.env.PUBLIC_URL}/users`} component={Users}></Routes>
        <Routes exact path={`${process.env.PUBLIC_URL}/wallets`} component={Wallets}></Routes>
        <Routes exact path={`${process.env.PUBLIC_URL}/`} component={Homepage}></Routes>

        <Routes component={RedirectAs404}></Routes>
      </Switch>
    </Suspense>
  );
};
export default Pages;
