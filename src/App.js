import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import { Dashboard, Login } from "./views/pages";
import { AUTHENTICATED } from "./application/Actions/Auth";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./utils/helpers/ProtectedRoute";

import "./infrastructure/Services/auth.service";

const App = () => {
  const dispatch = useDispatch();
  const user = JSON.parse(window.localStorage.getItem("user"));
  const access_token = window.localStorage.getItem("access_token");
  const refresh_token = window.localStorage.getItem("refresh_token");
  const role = window.localStorage.getItem("role");

  useEffect(() => {
    if (user) {
      dispatch({
        type: AUTHENTICATED,
        payload: {
          token: access_token,
          user: user,
          // token: user,
          // role
        },
      });
    }
  });

  return (
    <div className="App">
      <Switch>
        <Route exact path="/login" component={Login} />
        <ProtectedRoute path="/" component={Dashboard} />
      </Switch>
    </div>
  );
};

export default App;
