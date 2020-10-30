import React from "react";
import axios from 'axios'
import { Router} from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./redux/Store";
import { History } from "./jwt/_helpers";
import AppRouter from "./appRouter";

let urls = {
  development: process.env.REACT_APP_DEV_API_URL,
  production:  process.env.REACT_APP_PRODUCTION_API_URL
}

axios.defaults.baseURL = urls[process.env.NODE_ENV];

const App = () => {

  //AuthenticationService.logout();

  console.log('cargando ruta de la API:'+ urls[process.env.NODE_ENV]);

  return (
    <Provider store={configureStore()}>
      <Router history={History}>
        <AppRouter />
      </Router>
    </Provider>
  );
};
export default App;
