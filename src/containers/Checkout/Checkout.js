import React, {Component} from 'react';
import CheckoutSummary from "../../Components/Order/CheckoutSummary/CheckoutSummary";
import {Route} from "react-router-dom"
import ContactData from "./ContactData/ContactData";
class Checkout extends Component {
  state = {
    ingredients :{},
    totalPrice:0
  }
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search)
    const ingredients = {};
    let price = 0;
    for (let param of query.entries()){
      if (param[0]==="price"){
          price = param[1];
      }else {
        ingredients[param[0]] = +param[1]
      }
    }
    this.setState({ingredients:ingredients , totalPrice:price})
  }

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
          ingredients={this.state.ingredients}
          checkOutCancelled={this.checkOutCancelledHandeler}
          checkOutContinued={this.checkOutContinuedHandeler}/>
          <Route path={this.props.match.path + "/contact-data"}
                 render={(props)=><ContactData ingredients={this.state.ingredients} totalPrice={this.state.totalPrice} {...props}/>}/>
          {/*<ContactData/>*/}
      </div>
    );
  }
}

export default Checkout;
