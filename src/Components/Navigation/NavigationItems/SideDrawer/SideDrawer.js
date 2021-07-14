import React from "react";
import classes from "./SideDrawer.css";
import Logo from "../../../Logo/Logo";
import NavigationItems from "../NavigationItems";
import Aux from "../../../../hoc/Aux(1)/Aux(1)";
import BackDrop from "../../../UI/Backdrop/Backdrop";

const sideDrawer = (props) => {
  let attachedClasses = [classes.SideDrawer, classes.Close];
  if (props.open) {
    attachedClasses = [classes.SideDrawer, classes.Open];
  }

  return (
    <Aux>
      <BackDrop show={props.open} cancelPurchasing={props.closed} />
      <div className={attachedClasses.join(" ")} onClick={props.closed}>
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthenticated={props.isAuthenticated} />
        </nav>
      </div>
    </Aux>
  );
};
export default sideDrawer;
