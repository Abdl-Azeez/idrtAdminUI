// PrivateRoute.js
import React from "react";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ exact, roles, component: Component, ...rest }) => {
  const userRole = localStorage.getItem("idrtRole")
    ? JSON.parse(localStorage.getItem("idrtRole"))
    : null;

  // Check if the user has the required role or if no roles are specified
  const isAuthorized = !roles || (userRole && roles.includes(userRole));

  return (
    <Route
      exact={exact ? true : false}
      {...rest}
      render={(props) =>
        isAuthorized ? (
          <Component {...props} />
        ) : (
          <Redirect to={`/404`} />
        )
      }
    />
  );
};

export default PrivateRoute;
