import React from "react";
import classes from "./Burger.css";
import BurgerIng from "./BurgerIng/BurgerIng";
import { withRouter } from "react-router-dom";

const Burger = (props) => {
  let transIng = Object.keys(props.ing)
    .map((igKey) => {
      return [...Array(props.ing[igKey])].map((_, i) => {
        return <BurgerIng key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);

    if(transIng.length === 0){
         transIng = <p>Please start adding ingredients!</p>
    }
  console.log("transing:", transIng);

  return (
    <div className={classes.Burger}>
      <BurgerIng type="bread-top" />
      {transIng}
      <BurgerIng type="bread-bottom" />
    </div>
  );
};

export default withRouter(Burger);
