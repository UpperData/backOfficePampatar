import React, {useState, useEffect} from "react";
import axios from 'axios'
import {Route, Switch, withRouter } from "react-router-dom";

import {publicRoutes, AuthRoutes} from "./routes/";

import { PrivateRoute } from "./routes/PrivateRoutes";
import {PublicRoute} from "./routes/PublicRoute";

import { AuthenticationService } from "./jwt/_services";

import {useSelector, useDispatch} from 'react-redux'
import {handleLogin, set_store_logo} from './redux/session/Actions'
import { 
  set_backoffice_menu, 
  set_role, 
  set_phone_types,
  set_store_types,
  set_sales_channels,
  set_people_types,
  set_document_types,
  set_regions,
  set_genders,
  set_nationalities,
  set_banks,
  set_address_types,
  set_general_days
} 
from "./redux/backoffice/Actions";

//components
import SetRole from "./views/roles/SetRole";
import Spinner from "./views/spinner/Spinner";

import TokenExpired from "./views/token/TokenExpired";

//REACT_APP_DEV_API_URL
//REACT_APP_SECONDARY_API_URL

let urls = {
  development: process.env.REACT_APP_DEV_API_URL,
  production:  process.env.REACT_APP_PRODUCTION_API_URL
}

axios.defaults.baseURL = urls[process.env.NODE_ENV];
//console.log('cargando ruta de la API:'+ urls[process.env.NODE_ENV]);

const NotFound = () => {
  return  <div>
            404
          </div>
}

const AppRouter = (props) => {

  const [loading, setloading] = useState(true);
  const [searchAuthData, setSearchAuthData] = useState(true);
  const [searchSession, setSearchSession]   = useState(true);
  const [searchMasters, setSearchMasters]   = useState(true);

  const session = useSelector(state => state.session);
  const backoffice = useSelector(state => state.backoffice);
  const dispatch = useDispatch();

  let userInStorage = AuthenticationService.currentUserValue;

  let search = ((props.location.search !== '' && props.location.search !== null) ? props.location.search : null);
  let loginWithTkn = search !== null && props.location.pathname === '/authentication/Login';
  let query = null;
  let withTkn = null;
  let tkn = null;

  if(loginWithTkn){

    query = new URLSearchParams(props.location.search);
    withTkn = query.get('withTkn');
    
    if(withTkn !== null && withTkn !== undefined){
      tkn = query.get('tkn');
    }

    //console.log(withTkn);
    //console.log(tkn);
    //console.log(props.location.pathname);
  }

  const getMenuItems = (roleUrl) => {
    if(searchAuthData){
      setSearchAuthData(false);
      if(backoffice.menu === null){
        //console.log('autentication complete, search data...');
        let result = AuthenticationService.getMenuItems(roleUrl);
        result.then((res) => {
          //console.log(res);
          //props.history.push('/');
          dispatch(set_backoffice_menu(res.data));
        }).catch((err) => {
          console.error(err);
        })
      }
    }
  }

  let failRequestByToken = false;

  useEffect(() => {
    //INTERCEPCION
        axios.interceptors.response.use((response) => {
          return response;
      }, (error) => {

      if (!error.response) {
          //alert('NETWORK ERROR, revise su conexion a internet')
      } else {
          const code = error.response.status
          const response = error.response.data
          const originalRequest = error.config;
  
          if (code === 401 && !originalRequest._retry && !failRequestByToken) {
              originalRequest._retry = true;
              failRequestByToken = true;
              //let STORAGE_ISLOGED = localStorage.getItem('is_loged');
              //let validate = window.appData.mpt !== '' && STORAGE_ISLOGED === 'true' && state.is_loged;
              
              if(!session.auth){
                let urlTkn = '/session/token-expired';
                //console.log('El token ha caducado, logout');

                props.history.push(urlTkn);
              }else{
                //console.log('El token ha caducado, logout');
              }

              //console.log('storage: '+STORAGE_ISLOGED);
              //console.log('is loged: '+state.is_loged);
              //console.log('mpt: '+window.appData.mpt);

              //console.log(validate);

              /*
              if(validate){
                  setAcessToken(dispatch, '');
                  handleLogout(dispatch);
                  window.appData.mpt = '';
                  
                  if (window.location.origin === 'http://localhost:3000' || window.location.origin === 'http://marketplacepp.pegasohost.net') {
                      window.location.href = 'http://marketplacepp.pegasohost.net/es/cerrar-sesion/'
                  } else {
                      window.location.href = window.location.origin+'/es/cerrar-sesion/'
                  }
                  //var redirect = window.location.origin+'/es/iniciar-sesion/';
                  //window.location.href = redirect;
              }
              */

              //handleLogout(dispatch);
              //setAcessToken(dispatch, '');
              //window.appData.mpt = '';
          }
          return Promise.reject(error);
      }
    });

    if(loading){
      if(searchSession){
        setSearchSession(false);
        if(loginWithTkn){
          setloading(false);
        }else{
          if(userInStorage === null){
            setloading(false);
          }else{
            //console.log(AuthenticationService.currentUserValue);
            //console.log('logueando por token');
            let token = AuthenticationService.tokenValue;
            let res = AuthenticationService.loginWithTkn(token);
            res.then((res) => {
              //console.log(res.data);
                if(res.data.data.result){
                  dispatch(handleLogin(res.data.data));
                  setloading(false);
                }else{
                  setloading(false);
                }
            }).catch((err) => {
              //console.log(err);
              //AuthenticationService.logout();
              setloading(false);
            });
          }
        }
      }
    }else{
      if(session.auth){
        axios.defaults.headers.common = {'Authorization': `Bearer ${localStorage.getItem('token')}`}
        let RoleInLocalStorage = localStorage.getItem('role');

        //si esta logueado entonces buscar maestros
        if(searchMasters){
          setSearchMasters(false);
          //console.log('Seteando maestros');

          if(backoffice.phoneTypes === null){
            dispatch(set_phone_types());
          }

          if(backoffice.storeTypes === null){
            dispatch(set_store_types());
          }

          if(backoffice.salesChannels === null){
            dispatch(set_sales_channels());
          }

          if(backoffice.documentTypes === null){
            dispatch(set_document_types());
          }

          if(backoffice.peopleTypes === null){
            dispatch(set_people_types());
          }

          if(backoffice.generalsDays === null){
            dispatch(set_general_days());
          }

          if(backoffice.regions === null){
            dispatch(set_regions());
          }

          if(backoffice.nationalities === null){
            dispatch(set_nationalities());
          }

          if(backoffice.genders === null){
            dispatch(set_genders());
          }

          if(backoffice.banks === null){
            dispatch(set_banks());
          }

          if(backoffice.addressTypes === null){
            dispatch(set_address_types());
          }

          if(session.storeLogo === null){
            dispatch(set_store_logo());
          }
        }

        if(backoffice.role.hasOwnProperty('id')){
          let roleUrl = `/admin-panel/${backoffice.role.id}`;
          if(backoffice.menu === null){
            getMenuItems(roleUrl);
          }
        }else if(RoleInLocalStorage !== undefined && Number(RoleInLocalStorage) > -1 && RoleInLocalStorage !== null){
          //console.log('Rol cargado desde el localstorage', RoleInLocalStorage);
          let roles = session.userData.role;
          let getRoleByUser = roles.find(item => item.id === Number(RoleInLocalStorage));
          dispatch(set_role(getRoleByUser));
        }

        //console.log('Render Router');
      }
    }
  });

  if(!loading){
    if(!session.auth){
        return  (
          <Switch>
            <Route exact path='/account/set-role'       component={SetRole} />
            <Route exact path='/session/token-expired'  component={TokenExpired} />
              
            {
              AuthRoutes.map((prop, key) => {
                  return (
                    <PublicRoute
                      path={prop.path}
                      key={key}
                      component={prop.component}
                    />
                  );
              })
            }
          </Switch>
      );
    }else{
        return (
          <Switch>
            <Route exact path='/account/set-role'       component={SetRole} />
            <Route exact path='/session/token-expired'  component={TokenExpired} />

            {
              publicRoutes.map((prop, key) => {
                return (
                  <PrivateRoute
                    path={prop.path}
                    key={key}
                    component={prop.component}
                  />
                );
              })
            }       
          </Switch>
        );
    }
  }else{
    return (
      <Spinner />
    )
  }
};

export default withRouter(AppRouter);
