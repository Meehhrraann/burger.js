import React, { Component } from "react";
import asyncComponent from "./hoc/asyncComponent/asyncComponent";

import Layout from "./hoc/Layout/Layout";

import BurgerBuilder from "./Container/BurgerBuilder";
import Logout from "./Container/Auth/Logout/Logout";
import * as actions from "./store/actions/index";
import { Route, Switch, withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const asyncCheckout = asyncComponent(() => {
  return import("./Container/Checkout/Checkout");
});

const asyncOrders = asyncComponent(() => {
  return import("./Container/Orders/Orders");
});

const asyncAuth = asyncComponent(() => {
  return import("./Container/Auth/Auth");
});

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/auth" component={asyncAuth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to={this.props.authRedirectPath} />
      </Switch>
    );

    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" component={asyncCheckout} />
          <Route path="/orders" component={asyncOrders} />
          <Route path="/Logout" component={Logout} />
          {/* <Route path="/auth" component={asyncAuth} /> */}
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to={this.props.authRedirectPath} />
        </Switch>
      );
    }
    return (
      <div>
        <Layout>{routes}</Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(actions.checkForAutoAuth()),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
