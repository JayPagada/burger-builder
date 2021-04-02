import React, {Component} from 'react';
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import {Route , Redirect} from "react-router-dom"
import ContactData from "./ContactData/ContactData";
import {connect} from "react-redux";

class Checkout extends Component {

  checkOutCancelledHandler = ()=>{
    this.props.history.goBack();
  }
  checkOutContinuedHandler = ()=>{
  this.props.history.replace("/Checkout/contact-data")
  }
  render() {
    let summary = <Redirect to="/"/>
    if (this.props.ings){
      const purchasedRedirect =this.props.purchased ? <Redirect to="/"/>:null;
      summary = (
        <div>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkOutCancelled={this.checkOutCancelledHandler}
            checkOutContinued={this.checkOutContinuedHandler}/>
          <Route path={this.props.match.path + "/contact-data"}
                 component={ContactData}
          />
        </div>
      )
    }
    return summary;
  }
}
const mapStateTOProps=(state)=>{
  return{
    ings: state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice,
    purchased :state.order.purchasing
  }
}

export default connect(mapStateTOProps)(Checkout);
