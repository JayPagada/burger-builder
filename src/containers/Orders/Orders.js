import React, {Component} from 'react';
import Order from "../../Components/Order/Order";
import axios from "../../Axios-Orders.js"
import {connect} from "react-redux";
import * as burgerBuilderActions from "../../Store/actions/burgerBuilder";
import * as orderActions from "../../Store/actions/order";
import Spinner from "../../Components/UI/Spinner/Spinner";
class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrders();
  }

  render() {
    let orders = <Spinner/>;
    if (!this.props.loading){
      orders = this.props.orders.map(order=>(
          <Order
            key={order.id}
            ingredients={order.ingredients}
            price={+order.price}
          />))
    }
    return (
      <div>
        {orders}
      </div>
    );
  }
}
const mapStateTOProps=(state)=>{
  return{
    orders:state.order.orders,
    loading:state.order.loading
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    onFetchOrders:()=>dispatch(orderActions.fetchOrders())
  }
}
export default connect(mapStateTOProps,mapDispatchToProps)(Orders);
