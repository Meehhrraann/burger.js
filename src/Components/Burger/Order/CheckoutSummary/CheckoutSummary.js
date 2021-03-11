import React from "react";
import classes from "./CheckoutSummary.css";
import Burger from "../../Burger";
import Button from "../../../UI/Button/Button";

const CheckoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <p>I hope you like it !</p>
      <div style={{ margin: "auto" }}>
        <Burger ingredients={props.ingredients} />
      </div>
      <Button btnType="Danger" btnFunc={props.checkoutCancel}>
        CANCEL
      </Button>
      <Button btnType="Success" btnFunc={props.checkoutContinue}>
        CONTINUE
      </Button>
    </div>
  );
};

export default CheckoutSummary;
