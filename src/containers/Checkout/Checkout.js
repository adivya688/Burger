import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";

class Checkout extends Component {
  state = {
    ing: null,
    price: 0,
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ing = {};
    let price = 0;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ing[param[0]] = +param[1];
      }

      console.log("ingparam:", ing[param[0]]);
    }
    this.setState({ ing: ing, totalPrice: price });
  }
  checkoutCancelHandler = () => {
    this.props.history.goBack();
  };

  checkoutSuccessHandler = () => {
    this.props.history.replace("/Checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ing={this.state.ing}
          checkoutCancel={this.checkoutCancelHandler}
          checkoutSuccess={this.checkoutSuccessHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ing={this.state.ing}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
