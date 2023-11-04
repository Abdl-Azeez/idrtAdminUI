import React, { useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import Routes from "./route/routes";

import { RedirectAs404 } from "./utils/Utils";

import Layout from "./layout/Index";



const App = () => {
  return (
    <div>
      <>
        <Switch>
          <Routes exact path={``} component={Layout}></Routes>
          <Route component={RedirectAs404}></Route>
        </Switch>
      </>
    </div>

  );
};
export default withRouter(App);
