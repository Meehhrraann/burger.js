import React from "react";
import classes from "./BuildControl.css";

const buildControl = (props) => {
  return (
    <div className={classes.BuildControl}>
      <div className={classes.Label}>{props.label}</div>

      <button className={classes.More} onClick={props.added}>
        more
      </button>
      <button
        className={classes.less}
        onClick={props.removed}
        disabled={props.disabledInfo}
      >
        less
      </button>
    </div>
  );
};

export default buildControl;
