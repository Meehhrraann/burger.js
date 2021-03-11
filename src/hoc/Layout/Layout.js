import React, { Component } from "react";
import Aux from "../Aux(1)/Aux(1)";
import classes from "./Layout.css";
import Toolbar from "../../Components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../Components/Navigation/NavigationItems/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: false,
  };
  SideDrawerCloseHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  SideDrawerToggleHandler = () => {
    // const copyShowSideDrawer = this.state.showSideDrawer;
    // this.setState({ showSideDrawer: !copyShowSideDrawer });
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
  };

  render() {
    return (
      <Aux>
        <Toolbar toggleHandler={this.SideDrawerToggleHandler} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.SideDrawerCloseHandler}
        />
        {/* NOTE ***display Burger component in Layout component as children*/}
        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}

export default Layout;
