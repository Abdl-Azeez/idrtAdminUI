import React from "react";
import { Route, Redirect } from "react-router-dom";

const Routes = ({ exact, isActive, component: Component, ...rest }) => (
    <Route
        exact={exact ? true : false}
        rest
        render={(props) =>
            <Component {...props} {...rest}></Component>
        }
    ></Route>
);

export default Routes;