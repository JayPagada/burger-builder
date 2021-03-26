import React from 'react';
import classes from "./Order.module.css"
const Order = (props)=>{

  return (
    <div className={classes.Order}>
      <p>ingredients:</p>
      <p>price: <strong>USD {props.price.toFixed(2)}</strong> </p>
    </div>
  );
}


export default Order;
