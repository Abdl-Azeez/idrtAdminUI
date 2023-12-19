// Pages.js
import React, { Suspense, useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { RedirectAs404 } from "../utils/Utils";
import Login from "../pages/auth/Login";
import Homepage from "../pages/index";
import Transactions from "../pages/Transactions";
import User from "../pages/User";
import Wallets from "../pages/Wallets";
import OrphanLog from "../pages/OrphanLog";
import Settings from "../pages/Settings";
import Merchants from "../pages/Merchants";
import Agents from "../pages/Agents";
import PrivateRoute from "./PrivateRoute";

const Pages = () => {
  useEffect(() => {
    // Additional initialization code if needed
  }, []);

  return (
    <Suspense fallback={<div />}>
      <Switch>
        {/* <Route exact path={`/login`} component={Login} /> */}
        {/* <Route component={RedirectAs404} /> */}
        <PrivateRoute exact path={`/`} component={Homepage} roles={["MERCHANT", "ADMIN", "AGENT"]} />
        <PrivateRoute exact path={`/merchants`} component={Merchants} roles={["ADMIN", "AGENT"]} />
        <PrivateRoute exact path={`/agents`} component={Agents} roles={["ADMIN"]} />
        <PrivateRoute exact path={`/users`} component={User} roles={["MERCHANT", "ADMIN", "AGENT"]} />
        <PrivateRoute exact path={`/wallets`} component={Wallets} roles={["ADMIN"]} />
        <PrivateRoute exact path={`/transactions`} component={Transactions} roles={["MERCHANT", "ADMIN", "AGENT"]} />
        <PrivateRoute exact path={`/orphan_log`} component={OrphanLog} roles={["ADMIN"]} />
        <PrivateRoute exact path={`/settings`} component={Settings} roles={["MERCHANT", "ADMIN", "AGENT"]} />

        <Route component={RedirectAs404} />
      </Switch>
    </Suspense>
  );
};

export default Pages;
export const publicRoutesData = [
  { path: `/login`, component: Login },
];
