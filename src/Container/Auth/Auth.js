import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Auth.css";
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import Spinner from "../../Components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";

class Auth extends Component {
  state = {
    loginForm: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your Email",
        },
        value: "",
        validation: { required: true, isEmail: true },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Your password",
        },
        value: "",
        validation: { required: true, minLenght: 6 },
        valid: false,
        touched: false,
      },
    },
    isSingUp: true,
  };

  inputValidity = (value, needValidation) => {
    let isValid = true;
    if (needValidation.required) {
      isValid = value.trim() !== "" && isValid;
    }

    if (needValidation.minLenght) {
      isValid = needValidation.minLenght <= value.length && isValid;
    }

    if (needValidation.maxLenght) {
      isValid = needValidation.maxLenght >= value.length && isValid;
    }

    return isValid;
  };

  switchSingningModeHandler = () => {
    this.setState((prevState) => {
      return { isSingUp: !prevState.isSingUp };
    });
  };

  inputChangedHandler = (event, loginItem) => {
    const updatedLoginForm = {
      ...this.state.loginForm,
      [loginItem]: {
        ...this.state.loginForm[loginItem],
        value: event.target.value,
        valid: this.inputValidity(
          event.target.value,
          this.state.loginForm[loginItem].validation
        ),
        touched: true,
      },
    };
    this.setState({ loginForm: updatedLoginForm });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.loginForm.email.value,
      this.state.loginForm.password.value,
      this.state.isSingUp
    );
  };

  render() {
    const formElementsArray = [];
    for (let key in this.state.loginForm) {
      formElementsArray.push({
        id: key,
        config: this.state.loginForm[key],
      });
    }

    let form = formElementsArray.map((formElement) => (
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
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMessage = null;
    if (this.props.error) {
      errorMessage = <p>{this.props.error.message}</p>;
    }

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {errorMessage}
          {form}
          <Button btnType="Success">Submite</Button>
        </form>
        <Button btnType="Danger" btnFunc={this.switchSingningModeHandler}>
          Switch to {this.state.isSingUp ? "signin" : "signup"}
        </Button>
      </div>
    );
  }
}

const mapStateToPops = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSingUp) =>
      dispatch(actions.auth(email, password, isSingUp)),
  };
};

export default connect(mapStateToPops, mapDispatchToProps)(Auth);
