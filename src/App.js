import React, { Component } from "react";
import Layout from "./hoc/Layout/Layout";
import {Route,Switch} from 'react-router-dom';
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";

class App extends Component {
  render() {
    return (
      <div>
        <Layout>
        <Switch>
         <Route path="/" exact component={BurgerBuilder}/>
         <Route path="/Orders" component={Orders}/>
         <Route path="/Checkout" component={Checkout}/>

         </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;