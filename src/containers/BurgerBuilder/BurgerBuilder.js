import React, { Component } from "react";
import Auxi from "../../hoc/Auxi/Auxi";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../.././components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "../../hoc/axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

const ING_PRICE = {
  salad: 0.5,
  meat: 1.3,
  cheese: 0.4,
  bacon: 0.7,
};

class BurgerBuilder extends Component {
  state = {
    ing: null,
    totalPrice: 4,
    purchasable: false,
    purchasing: false,
    loading: false,
    error: false,
  };

  componentDidMount() {
    axios
      .get("https://react-my-burger-27704.firebaseio.com/ing.json")
      .then((response) => {
        this.setState({ ing: response.data });
      })
      .catch((error) => {
        this.setState({ error: true });
      });
  }

  updatePurchaseState(ingred) {
    const sum = Object.keys(ingred)
      .map((igKey) => {
        return ingred[igKey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }
  addIngHandler = (type) => {
    const oldCount = this.state.ing[type];
    const updatedCount = oldCount + 1;
    const updatedIng = {
      ...this.state.ing,
    };
    updatedIng[type] = updatedCount;
    const priceAdd = ING_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAdd;
    this.setState({ totalPrice: newPrice, ing: updatedIng });
    this.updatePurchaseState(updatedIng);
  };

  removeIngHandler = (type) => {
    const oldCount = this.state.ing[type];
    if (oldCount <= 0) {
      return;
    }
    const updatedCount = oldCount - 1;
    const updatedIng = {
      ...this.state.ing,
    };
    updatedIng[type] = updatedCount;
    const priceDeduct = ING_PRICE[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduct;
    this.setState({ totalPrice: newPrice, ing: updatedIng });
    this.updatePurchaseState(updatedIng);
  };

  purchaseHandler = () => {
    this.setState({ purchasing: true });
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    
    const queryParams = [];
     for (let i in this.state.ing) {
      queryParams.push(
        encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ing[i])
      );
    }
    queryParams.push('price=' + this.state.totalPrice)
    const queryString = queryParams.join("&");

    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString,
    });
  };

  render() {
    const disabledInfo = { ...this.state.ing };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
      //console.log{"disabledInfo[key]:",disabledInfo[key]}
      //{salad:true, meat:false,...}
    }
    let orderSummary = null;
    let burger = this.state.error ? (
      <p>Ingredients cant be loaded!</p>
    ) : (
      <Spinner />
    );

    if (this.state.ing) {
      burger = (
        <Auxi>
          <Burger ing={this.state.ing} />
          <BuildControls
            ingAdded={this.addIngHandler}
            ingRemove={this.removeIngHandler}
            disabled={disabledInfo}
            purchasable={this.state.purchasable}
            ordered={this.purchaseHandler}
            price={this.state.totalPrice}
          />
        </Auxi>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.state.ing}
          price={this.state.totalPrice}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
        />
      );
    }

    if (this.state.loading) {
      orderSummary = <Spinner></Spinner>;
    }

    return (
      <Auxi>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Auxi>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
