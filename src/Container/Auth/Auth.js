import React, { Component } from "react";
import { connect } from "react-redux";
import classes from "./Auth.css";
import Input from "../../Components/UI/Input/Input";
import Button from "../../Components/UI/Button/Button";
import Spinner from "../../Components/UI/Spinner/Spinner";
import * as actions from "../../store/actions/index";
import { Redirect } from "react-router-dom";
import { inputCheckValidity } from "../../shared/utility";

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

  componentDidMount() {
    if (!this.props.burgerBuilding && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath("/");
    }
  }

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
        valid: inputCheckValidity(
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

    let redirectToHomeAfterSignin = null;
    if (this.props.isAuthenticated) {
      redirectToHomeAfterSignin = <Redirect to={this.props.authRedirectPath} />;
    }
    console.log(this.props.authRedirectPath);
    return (
      <div className={classes.Auth}>
        {redirectToHomeAfterSignin}
        {errorMessage}
        <form onSubmit={this.submitHandler}>
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
    isAuthenticated: state.auth.token !== null,
    burgerBuilding: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSingUp) =>
      dispatch(actions.auth(email, password, isSingUp)),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(mapStateToPops, mapDispatchToProps)(Auth);
