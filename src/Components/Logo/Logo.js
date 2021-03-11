import React from "react";
import classes from "./Logo.css";
import LogoIcon from "../../assets/images/burger-logo.png";

const Logo = (props) => (
  <div className={classes.Logo}>
    <img src={LogoIcon} alt="my burger" />
  </div>
);

export default Logo;
