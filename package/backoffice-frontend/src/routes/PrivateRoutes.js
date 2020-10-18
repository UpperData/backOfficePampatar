import React from "react";
import {useSelector} from 'react-redux'
import { Route, Redirect } from "react-router-dom";
import { AuthenticationService } from "../jwt/_services";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const session = useSelector(state => state.session);
  
  return (
    <Route
    {...rest}
    render={(props) => {
      //const currentUser = AuthenticationService.currentUserValue;
  
      if (!session.auth) {
        // not logged in so redirect to login page with the return url
        return (
          <Redirect
            to={{
              pathname: "/authentication/Login",
              state: { from: props.location }
            }}
          />
        );
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
  )
};

export default PrivateRoute;
