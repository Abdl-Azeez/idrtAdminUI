import React from "react";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ exact, auth, component: Component, ...rest }) => (
  <Route
    exact={exact ? true : false}
    rest
    render={(props) =>
      auth ? <Redirect to={`${process.env.PUBLIC_URL}/`}></Redirect> : <Component {...props} {...rest}></Component>
    }
  ></Route>
);

export default PublicRoute;
