import React from 'react';
import classes from './NavigationItems.module.css'
import {NavLink} from "react-router-dom";

const NavigationItems = (props)=> {

    return (
      <ul className={classes.NavigationItems}>
        <li className={classes.NavigationItem}><NavLink activeClassName={classes.active} exact to="/">BurgerBilder</NavLink></li>
        <li className={classes.NavigationItem}><NavLink activeClassName={classes.active} to="/orders">Orders</NavLink></li>
      </ul>
    );

}

export default NavigationItems;
