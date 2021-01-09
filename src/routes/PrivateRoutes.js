import React from "react";
import {useSelector} from 'react-redux'
import { Route, Redirect } from "react-router-dom";
import Spinner from '../views/spinner/Spinner'
//import { AuthenticationService } from "../jwt/_services";

export const PrivateRoute = ({ component: Component, ...rest }) => {
  const session = useSelector(state => state.session);
  const backoffice = useSelector(state => state.backoffice);

  //let sinMenu = session.auth && backoffice.hasOwnProperty('role') && !backoffice.role.hasOwnProperty('id') && backoffice.menu === null;
  let RoleInLocalStorage = localStorage.getItem('role');
  let validRole = RoleInLocalStorage !== undefined && Number(RoleInLocalStorage) > -1 && RoleInLocalStorage !== null;
  
  return (
    <Route
      {...rest}
      render={(props) => {
        //const currentUser = AuthenticationService.currentUserValue;
        //console.log(sinMenu);

        if (!session.auth) {
          // Si no esta logueado envia al login
          //console.log('No esta logueado');
          return (
            <Redirect
              to={{
                pathname: "/authentication/Login",
                state: { from: props.location }
              }}
            />
          );
        }else if (session.auth && backoffice.hasOwnProperty('role') && !backoffice.role.hasOwnProperty('id') && !validRole) {
          // si no tiene un rol envia a seleccionar el rol
          //console.log(session.auth);
          //console.log(validRole);
          //console.log(RoleInLocalStorage);
          //console.log('redireccionando al select de roles');
          
          return (
            <Redirect
              to={{
                pathname: "/account/set-role",
                state: { from: props.location }
              }}
            />
          );
        }else if(session.auth && backoffice.hasOwnProperty('role') && !backoffice.role.hasOwnProperty('id') && backoffice.menu === null && validRole){
          return (
            <Spinner />
          )
        }else if(session.auth && backoffice.hasOwnProperty('role') && backoffice.role.hasOwnProperty('id') && backoffice.menu === null){
          return (
            <Spinner />
          )
        }


        // authorised so return component
        return <Component {...props} />;
      }}
  />
  )
};

export default PrivateRoute;
