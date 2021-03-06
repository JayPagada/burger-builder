import React, {Component} from 'react';
import Order from "../../Components/Order/Order";
import {connect} from "react-redux";
import * as orderActions from "../../Store/actions/order";
import Spinner from "../../Components/UI/Spinner/Spinner";
class Orders extends Component {

  componentDidMount() {
    this.props.onFetchOrders(this.props.token,this.props.userId);
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
    let errorMessage = null;
    if (this.props.token === null){
      errorMessage=(<p>plzz sign in</p>)
    }
    return (
      <div>
        {errorMessage}
        {orders}
      </div>
    );
  }
}
const mapStateToProps=(state)=>{
  return{
    orders:state.order.orders,
    loading:state.order.loading,
    token:state.auth.token,
    error:state.order.error,
    userId:state.auth.userId
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    onFetchOrders:(token,userId)=>dispatch(orderActions.fetchOrders(token,userId))
  }
}
export default connect(mapStateToProps,mapDispatchToProps)(Orders);
