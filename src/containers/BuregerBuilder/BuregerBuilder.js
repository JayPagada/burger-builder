import React, {Component} from 'react';
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Model from '../../Components/UI/Model/Model'
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import axios from "../../Axios-Orders.js";
import Spinner from "../../Components/UI/Spinner/Spinner";
import {connect} from "react-redux";

class BuregerBuilder extends Component {

  state = {
    purchasing:false,
    loading:false
  }

  componentDidMount() {
    axios.get("https://burger-builder-db98e-default-rtdb.firebaseio.com/ingredients.json")
      .then(response=> {
        this.setState({ingredients:response.data});
      })
  }

  updatePurchasable = (ingredients) =>{
    const sum = Object.keys(ingredients)
      .map((key)=>{
      return ingredients[key]
    }).reduce((sum,el)=>{
      return sum +el;
      },0)
    return  sum > 0
  }

  purchasHandeler = ()=>{
    this.setState({purchasing : true})
  }
  purchasCancelHandeler = ()=>{
    this.setState({purchasing : false})

  }
  purchasContinueHandeler = ()=> {
    const queryParams = [];
    for (let i in this.state.ingredients){
      queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(this.state.ingredients[i]))
    }
    queryParams.push("price="+this.props.price);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname:"/Checkout",
      search:"?"+ queryString
    })
  }
  render() {
    const disabledInfo = {
      ...this.props.ings
    };

    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;


    let burger = <Spinner/>

    if(this.props.ings){
      burger = (
        <Auxiliary>
        <Burger ingredients={this.props.ings}/>
        <BuildControls ingredientAdded={this.props.ingredientsAdded}
                     ingredientRemoved={this.props.ingredientsRemove}
                     disabled={disabledInfo}
                     purchasable ={this.updatePurchasable(this.props.ings)}
                     ordered = {this.purchasHandeler}
                     price={this.props.price}/>
        </Auxiliary>
      );
      orderSummary = <OrderSummary
        ingredients={this.props.ings}
        purchasCancel={this.purchasCancelHandeler}
        purchasContinue = {this.purchasContinueHandeler}
        price={this.props.price}/>;
    }
    if (this.state.loading){
      orderSummary = <Spinner/>
    }

    return (
      <Auxiliary>
        <Model show={this.state.purchasing} modelClose ={this.purchasCancelHandeler}>
          {orderSummary}
        </Model>
        {burger}
      </Auxiliary>
    );
  }
}
const mapStateTOProps=(state)=>{
  return{
    ings: state.ingredients,
    price:state.totalPrice
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    ingredientsAdded:(ingName)=>dispatch({type:"ADD_INGREDIENT" ,ingredientName:ingName}),
    ingredientsRemove:(ingName)=>dispatch({type:"REMOVE_INGREDIENT" ,ingredientName:ingName})
  }
}
export default connect(mapStateTOProps,mapDispatchToProps)(BuregerBuilder);
