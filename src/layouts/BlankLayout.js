import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import AuthRoutes from "../routes/AuthRoutes.js";

const BlankLayout = () => {
  return (
    <div className="authentications public-components">
      <Switch>
        {AuthRoutes.map((prop, key) => {
          //console.log(prop);
          if (prop.redirect)
            return <Redirect from={prop.path} to={prop.pathTo} key={key} />;

            return (
              <Route exact path={prop.path} component={prop.component} key={key} />
            );
        })}
      </Switch>
    </div>
  );
};
export default BlankLayout;
