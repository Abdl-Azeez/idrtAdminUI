import React, { Suspense, useLayoutEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { RedirectAs404 } from "../utils/Utils";
import Login from "../pages/auth/Login";
import Homepage from "../pages/index";
import Transactions from "../pages/Transactions";
import User from "../pages/User";
import Wallets from "../pages/Wallets";
import OrphanLog from "../pages/OrphanLog";
import Settings from "../pages/Settings";



const Pages = () => {
  useLayoutEffect(() => {
    // window.scrollTo(0, 0);
  });

  return (
    <Suspense fallback={<div />}>
      <Switch>

        <Route exact path={`${process.env.PUBLIC_URL}/`} component={Homepage}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/user`} component={User}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/wallets`} component={Wallets}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/transactions`} component={Transactions}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/orphan_log`} component={OrphanLog}></Route>
        <Route exact path={`${process.env.PUBLIC_URL}/settings`} component={Settings}></Route>

        <Route component={RedirectAs404}></Route>
      </Switch>
    </Suspense>
  );
};
export default Pages;
export const publicRoutesData = [
  { path: `/login`, component: Login },
];
