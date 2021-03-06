import React from 'react';
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.module.css"
const checkoutSummary = (props)=>{

    return (
      <div className={classes.CheckoutSummary}>
        <h1> we hope it testes well!</h1>
        <div style={{width:"100%",height:"300px",margin:"auto"}}>
          <Burger ingredients={props.ingredients}/>
        </div>
        <Button  btnType="Danger" Clicked={props.checkOutCancelled}> Cancel </Button>
        <Button btnType="Success" Clicked={props.checkOutContinued}> Continue </Button>
      </div>
    );
  }


export default checkoutSummary;
