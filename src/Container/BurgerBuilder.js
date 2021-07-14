import React, { Component } from "react";
import Aux from "../hoc/Aux(1)/Aux(1)";
import Burger from "../Components/Burger/Burger";
import BuildControls from "../Components/Burger/BuildControls/BuildControls";
import Modal from "../Components/UI/Modal/Modal";
import OrderSummary from "../Components/Burger/OrderSummary/OrderSummary";
import axios from "../../src/axios-orders";
import Spinner from "../Components/UI/Spinner/Spinner";
import withErrorHandler from "../hoc/whithErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from ".././store/actions/index";

export class BurgerBuilder extends Component {
  state = {
    // NOTE this is obj ---> transform to array in Burger
    purchasable: false,
    disable: false,
    purchasing: false,
  };

  componentDidMount() {
    console.log(this.props);
    this.props.onInitIngredients();
    // axios
    //   .get(
    //     "https://react-my-burger-6f351-default-rtdb.firebaseio.com/ingredients.json"
    //   )
    //   .then((response) => {
    //     this.setState({ ingredients: response.data });
    //   })
    //   .catch((error) => {
    //     this.setState({ error: true });
    //   });
  }

  updatePurchesState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((igkey) => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);

    return sum > 0;
  };

  // addIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   const addedCount = oldCount + 1;
  //   const newIngredient = {
  //     ...this.state.ingredients,
  //   };
  //   newIngredient[type] = addedCount;

  //   const oldPrice = this.state.totalPrice;
  //   const addedPrice = INGREDIENT_PRICES[type];
  //   const newPrice = oldPrice + addedPrice;

  //   this.setState({ ingredients: newIngredient, totalPrice: newPrice });
  //   this.updatePurchesState(newIngredient);
  // };

  // removeIngredientHandler = (type) => {
  //   const oldCount = this.state.ingredients[type];
  //   if (oldCount <= 0) {
  //     return;
  //   }
  //   const addedCount = oldCount - 1;
  //   const newIngredient = {
  //     ...this.state.ingredients,
  //   };
  //   newIngredient[type] = addedCount;

  //   const oldPrice = this.state.totalPrice;
  //   const addedPrice = INGREDIENT_PRICES[type];
  //   const newPrice = oldPrice - addedPrice;

  //   this.setState({
  //     ingredients: newIngredient,
  //     totalPrice: newPrice,
  //   });
  //   this.updatePurchesState(newIngredient);
  // };

  wantToPurchasing = () => {
    if (this.props.isAuthenticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  cancelPurchasing = () => {
    this.setState({ purchasing: false });
  };

  continuePurchasing = () => {
    // alert("done!")
    this.props.onInitPurchased();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ings,
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = this.props.error ? <p>somthing wrong!</p> : <Spinner />;
    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />

          <BuildControls
            addIngredient={this.props.onIngredientAdd}
            removeIngredient={this.props.onIngredientRemove}
            disabledInfo={disabledInfo}
            price={this.props.tprice}
            purchasable={this.updatePurchesState(this.props.ings)}
            wantToPurchasing={this.wantToPurchasing}
            isAuthenticated={this.props.isAuthenticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          price={this.props.tprice}
          cancelPurchasing={this.cancelPurchasing}
          continuePurchasing={this.continuePurchasing}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          cancelPurchasing={this.cancelPurchasing}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    tprice: state.burgerBuilder.total_price,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientAdd: (ingName) => dispatch(actions.addIngredient(ingName)),
    onIngredientRemove: (ingName) =>
      dispatch(actions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(actions.initInredients()),
    onInitPurchased: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) =>
      dispatch(actions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
