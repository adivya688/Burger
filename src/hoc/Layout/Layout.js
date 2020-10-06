import React, { Component } from "react";
import Auxi from "../Auxi/Auxi";
import classes from "./Layout.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";

class Layout extends Component {
  state = {
    showSideDrawer: true,
  };
  sideDrawerClosed = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerTogglerClicked = () => {
    this.setState((prevState) => {
      return { showSideDrawer: !prevState.showSideDrawer };
    });
    console.log("inside");
  };

  render() {
    return (
      <Auxi>
        <Toolbar drawerTogglerClicked={this.sideDrawerTogglerClicked} />
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosed}
        />
        <main className={classes.Content}>{this.props.children}</main>
      </Auxi>
    );
  }
}

export default Layout;
