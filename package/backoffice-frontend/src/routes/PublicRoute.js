import React from "react";
import {useSelector} from 'react-redux'
import { Route, Redirect } from "react-router-dom";
import { AuthenticationService } from "../jwt/_services";

export const PublicRoute = ({ component: Component, ...rest }) => {
  //const currentUser = AuthenticationService.currentUserValue;
  const session = useSelector(state => state.session);
  let urlRedirect = '/';

  return (
    <Route
    {...rest}
    render={(props) => {
      if (session.auth) {
        // not logged in so redirect to login page with the return url
        console.log(urlRedirect);

        return (
          <Redirect
            to={{
              pathname: urlRedirect,
              state: { from: props.location },
            }}
          />
        );
      }

      // authorised so return component
      return <Component {...props} />;
    }}
  />
  )
}

export default PublicRoute;
