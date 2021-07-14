import React, { Component } from "react";
import Button from "../../../Components/UI/Button/Button";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import classes from "../ContactData/ContactData.css";
import Input from "../../../Components/UI/Input/Input";
import axios from "../../../axios-orders";
import { connect } from "react-redux";
import withErrorHandler from "../../../hoc/whithErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions/index";
import { inputCheckValidity } from "../../../shared/utility";

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false,
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail",
        },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false,
      },
      city: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your City",
        },
        value: "",
        validation: { required: true },
        valid: false,
        touched: false,
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "ZIP Code",
        },
        value: "",
        validation: { required: true, maxLenght: 5, minLenght: 5 },
        valid: false,
        touched: false,
      },
      deliveryMethode: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "fastest" },
            { value: "cheapest", displayValue: "cheapest" },
          ],
        },
        value: "fastest",
        validation: {},
        valid: true,
      },
    },
    // loading: false,
    formIsValid: false,
  };

  orderHandler = (event) => {
    event.preventDefault();
    // this.setState({ loading: true });

    const formData = {};
    for (let formElementIdentifier in formData) {
      formData[formElementIdentifier] = this.state.orderForm[
        formElementIdentifier
      ].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.tprice,
      orderData: formData,
      userId: this.props.userId,
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  inputChangedHandler = (event, elementId) => {
    const updatedForm = { ...this.state.orderForm };
    const updatedElement = { ...updatedForm[elementId] };
    updatedElement.value = event.target.value;
    updatedElement.valid = inputCheckValidity(
      updatedElement.value,
      updatedElement.validation
    );

    updatedElement.touched = true;
    // console.log(updatedElement.valid);
    updatedForm[elementId] = updatedElement;

    let formIsValid = true;
    for (let input in updatedForm) {
      formIsValid = updatedForm[input].valid && formIsValid;
    }
    console.log(formIsValid);

    this.setState({ orderForm: updatedForm, formIsValid: formIsValid });
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementsArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            changed={(event) => this.inputChangedHandler(event, formElement.id)}
            valid={formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
          />
        ))}

        <Button btnType="Success" disabled={!this.state.formIsValid}>
          Order
        </Button>
      </form>
    );
    if (this.props.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    tprice: state.burgerBuilder.total_price,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
