import React, {Component} from 'react';
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom"
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";

class Checkout extends Component {

  checkOutCancelledHandeler = ()=>{
    this.props.history.goBack();
  }
  checkOutContinuedHandeler = ()=>{
  this.props.history.replace("/Checkout/contact-data")
  }
  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.props.ings}
          checkOutCancelled={this.checkOutCancelledHandeler}
          checkOutContinued={this.checkOutContinuedHandeler}/>
          <Route path={this.props.match.path + "/contact-data"}
                 // render={(props)=><ContactData ingredients={this.props.ings} totalPrice={this.props.price} {...props}/>}
                component={ContactData}
          />
          {/*<ContactData/>*/}
      </div>
    );
  }
}
const mapStateTOProps=(state)=>{
  return{
    ings: state.ingredients,
    price:state.totalPrice
  }
}

export default connect(mapStateTOProps)(Checkout);
