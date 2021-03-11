import React, { Component } from "react";

import Layout from "./hoc/Layout/Layout";

import BurgerBuilder from "./Container/BurgerBuilder";
import Checkout from "./Container/Checkout/Checkout";
import Orders from "./Container/Orders/Orders";
import { Route, Switch } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/Orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;
