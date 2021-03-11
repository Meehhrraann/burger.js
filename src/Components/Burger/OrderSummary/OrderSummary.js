import React, { Component } from "react";
import Aux from "../../../hoc/Aux(1)/Aux(1)";
import Button from "../../UI/Button/Button";

class OrderSummary extends Component {
  componentDidUpdate() {
    console.log("[OrderSummary] did updated");
  }
  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map(
      (igkey) => {
        return (
          <li key={igkey}>
            <span style={{ textTransform: "capitalize" }}>{igkey}</span> :{" "}
            {this.props.ingredients[igkey]}
          </li>
        );
      }
    );

    return (
      <Aux>
        <p>your burger :</p>
        <ul>{ingredientSummary}</ul>
        <p>do you want check out ?</p>
        <p>
          <strong>price is : {this.props.price.toFixed(2)}</strong>{" "}
        </p>
        <Button btnFunc={this.props.cancelPurchasing} btnType={"Danger"}>
          cancel
        </Button>
        <Button btnFunc={this.props.continuePurchasing} btnType={"Success"}>
          continue
        </Button>
      </Aux>
    );
  }
}

export default OrderSummary;
