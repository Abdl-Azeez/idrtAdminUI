import React, { useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import PrivateRoute from "./route/PrivateRoute";
import PublicRoute from "./route/PublicRoute";
import { publicRoutesData } from "./route/Index";

import { Toast } from "./components/Component";
import { Spinner } from "reactstrap";
import { RedirectAs404 } from "./utils/Utils";

import Layout from "./layout/Index";
import { useSelector, useDispatch } from "react-redux";
import { loadMerchant, generalToastError } from "./store/actions";


const App = () => {
  const { Auth } = useSelector((state) => state);
  const { error, toastMessage, toastType } = useSelector((state) => state.General);
  const { merchant, merchantError } = useSelector((state) => state.Merchant);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadMerchant());
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        dispatch(generalToastError());
      }, 2000);
    }
  }, [error]);

  console.log(merchant?.users)
  return (
    <div>
      <Toast type={toastType} message={toastMessage} show={error} />
      {/* {Auth.isAuthenticated !== null ? ( */}
      <>
        <Switch>
          {publicRoutesData.map((route, idx) => (
            <PublicRoute path={route.path} component={route.component} auth={Auth.isAuthenticated} key={idx} />
          ))}

          <PrivateRoute exact auth={Auth.isAuthenticated} path={``} component={Layout}></PrivateRoute>
          <Route component={RedirectAs404}></Route>
        </Switch>
      </>
      {/* ) : (
        <div className="vh-100 d-flex align-items-center justify-content-center text-center">
          <Spinner style={{ width: "10rem", height: "10rem" }} type="grow" color="success" />
        </div>
      )} */}
    </div>

  );
};
export default withRouter(App);
