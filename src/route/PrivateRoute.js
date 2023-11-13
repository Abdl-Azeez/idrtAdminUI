import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ exact, auth, isActive, component: Component, ...rest }) => (
  <Route
    exact={exact ? true : false}
    rest
    render={(props) =>
      auth ? (
        <>
          <Component {...props} {...rest}></Component>
        </>
      ) : (
        <Redirect to={`/login`}></Redirect>
      )
    }
  ></Route>
);

export default PrivateRoute;
