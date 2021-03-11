import React from "react";

import classes from "./Burger.css";
import BurgerIngredient from "../BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igkey) => {
      return [...Array(props.ingredients[igkey])].map((_, i) => {
        return <BurgerIngredient key={igkey + i} type={igkey} />;
      });
    })

    // NOTE 4 array (salad,...) ---> 1 array ---> we can check the lenght
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>add ingredients !</p>;
  }

  // console.log(transformedIngredients);

  //   .reduce((arr, el) => {
  //     return arr.concat(el);
  //   }, []);
  // if (transformedIngredients.length === 0) {
  //   transformedIngredients = <p>Please start adding ingredients!</p>;
  // }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;

// NOTE *** Catch ingredients object from BurgerBuilder ---> transform to array
