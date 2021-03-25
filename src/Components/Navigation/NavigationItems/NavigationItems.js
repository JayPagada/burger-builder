import React from 'react';
import classes from './NavigationItems.module.css'
const NavigationItems = (props)=> {

    return (
      <ul className={classes.NavigationItems}>
        <li className={classes.NavigationItem}><a className={classes.active? classes.active :null} href="/">BurgerBilder</a></li>
        <li className={classes.NavigationItem}><a className={classes.active? classes.active :null} href="/">Checkout</a></li>
      </ul>
    );

}

export default NavigationItems;
