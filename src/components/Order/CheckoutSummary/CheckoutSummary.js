import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import "./CheckoutSummary.css";

const CheckoutSummary = (props) => {
  return (
    <div className="CheckoutSummary">
      <h1> Enjoy the Burger!</h1>
      <div style={{ width: "100%",  margin: "auto" }}>
        <Burger ing={props.ing} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancel}>
        Cancel
      </Button>
      <Button btnType="Success" clicked={props.checkoutSuccess}>
        Continue
      </Button>
    </div>
  );
};

export default CheckoutSummary;
