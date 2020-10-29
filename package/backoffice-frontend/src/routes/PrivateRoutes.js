import React from "react";
import {useSelector} from 'react-redux'
import { Route, Redirect } from "react-router-dom";
//import { AuthenticationService } from "../jwt/_services";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const session = useSelector(state => state.session);
  const backoffice = useSelector(state => state.backoffice);
  
  return (
    <Route
      {...rest}
      render={(props) => {
        //const currentUser = AuthenticationService.currentUserValue;
    
        if (!session.auth) {
          // Si no esta logueado envia al login
          return (
            <Redirect
              to={{
                pathname: "/authentication/Login",
                state: { from: props.location }
              }}
            />
          );
        }else if (session.auth && backoffice.hasOwnProperty('role') && !backoffice.role.hasOwnProperty('id')) {
          // si no tiene un rol envia a seleccionar el rol
          console.log('redireccionando al select de roles');
          return (
            <Redirect
              to={{
                pathname: "/account/set-role",
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
