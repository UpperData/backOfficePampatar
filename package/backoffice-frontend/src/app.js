import React from "react";
import axios from 'axios'
import {publicRoutes, AuthRoutes} from "./routes/";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./redux/Store";
import { History } from "./jwt/_helpers";
import { PrivateRoute } from "./routes/PrivateRoutes";
import BlankLayout from "./layouts/BlankLayout";
import {PublicRoute} from "./routes/PublicRoute";
import {useSelector} from 'react-redux'
import AppRouter from "./appRouter";

let urls = {
  development: process.env.REACT_APP_DEV_API_URL,
  production:  process.env.REACT_APP_PRODUCTION_API_URL
}

axios.defaults.baseURL = urls[process.env.NODE_ENV];

const App = () => {
  return (
    <Provider store={configureStore()}>
      <Router history={History}>
        <Switch>

          {AuthRoutes.map((prop, key) => {
              return (
                <PublicRoute
                  path={prop.path}
                  key={key}
                  component={prop.component}
                />
              );
          })}

          {publicRoutes.map((prop, key) => {
            return (
              <PrivateRoute
                path={prop.path}
                key={key}
                component={prop.component}
              />
            );
          })}
          
        </Switch>
      </Router>
    </Provider>
  );
};
export default App;
