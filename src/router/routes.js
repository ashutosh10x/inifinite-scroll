import React from "react";
import Login from "../components/Login";
import Home from "../components/Home";
import history from "./history";
import { BrowserRouter, Switch, Route } from "react-router-dom";

class Routes extends React.Component {
  render() {
    return (
      <BrowserRouter history={history}>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    );
  }
}
export default Routes;
