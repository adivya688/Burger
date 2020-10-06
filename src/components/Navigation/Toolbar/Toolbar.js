import React from "react";
import classes from "./Toolbar.css";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggler from "../../Navigation/SideDrawer/DrawerToggler/DrawerToggler";

const Toolbar = (props) => (
  <header className={classes.Toolbar}>
    <DrawerToggler clicked={props.drawerTogglerClicked} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav >
     <NavigationItems />
    </nav>
  </header>
);

export default Toolbar;
