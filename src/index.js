import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";

import { Store } from "./utils/helpers/Store";
import App from "./App";
import "antd/dist/antd.css";
// NetworkService.setupInterceptors(store);
ReactDOM.render(
  <Provider store={Store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById("root")
);
