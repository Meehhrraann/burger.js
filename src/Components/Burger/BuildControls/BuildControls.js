import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
  { label: "Salad", type: "salad" },
  { label: "Bacon", type: "bacon" },
  { label: "Cheese", type: "cheese" },
  { label: "Meat", type: "meat" },
];

const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p price={props.price}>
        price is : <strong>{props.price.toFixed(2)}</strong>
      </p>

      {controls.map((ctrl) => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.addIngredient(ctrl.type)}
          removed={() => props.removeIngredient(ctrl.type)}
          disabledInfo={props.disabledInfo[ctrl.type]}
        />
      ))}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.wantToPurchasing}
      >
        {props.isAuthenticated ? "ORDER NOW" : "Sign in first !"}
      </button>
    </div>
  );
};

export default buildControls;
