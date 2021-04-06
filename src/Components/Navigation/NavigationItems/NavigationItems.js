import React from 'react';
import classes from './NavigationItems.module.css'
import {NavLink} from "react-router-dom";

const NavigationItems = (props) => {

  return (
    <ul className={classes.NavigationItems}>
      <li className={classes.NavigationItem}>
        <NavLink activeClassName={classes.active} exact to="/">BurgerBilder</NavLink>
      </li>
        <li className={classes.NavigationItem}>
          {
            props.isAuth ?
            <NavLink activeClassName={classes.active} to="/orders">Orders</NavLink>:
              null
          }
        </li>
      {
        props.isAuth ?
          <li className={classes.NavigationItem}>
            <NavLink activeClassName={classes.active} to="/logout">Logout</NavLink>
          </li> :
          <li className={classes.NavigationItem}>
            <NavLink activeClassName={classes.active} to="/Auth">Authenticate</NavLink>
          </li>
      }
    </ul>
  );

}

export default NavigationItems;
