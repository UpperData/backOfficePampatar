import React from "react";
import { Router} from "react-router-dom";
import { Provider } from "react-redux";
import { configureStore } from "./redux/Store";
import { History } from "./jwt/_helpers";
import AppRouter from "./appRouter";

const App = () => {
  return (
    <Provider store={configureStore()}>
      <Router history={History}>
        <AppRouter />
      </Router>
    </Provider>
  );
};
export default App;
