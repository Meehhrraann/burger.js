import React from "react";
import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = (props) => (
  <ul className={classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/orders" exact>
      Orders
    </NavigationItem>
    <NavigationItem link="/auth" exact>
      Authentication
    </NavigationItem>
  </ul>
);

export default navigationItems;
