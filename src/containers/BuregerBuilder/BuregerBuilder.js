import React, {Component} from 'react';
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Model from '../../Components/UI/Model/Model'
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../Components/UI/Spinner/Spinner";
import {connect} from "react-redux";
import * as burgerBuilderActions from "../../Store/actions/burgerBuilder.js"
import * as orderActions from "../../Store/actions/order.js"
class BuregerBuilder extends Component {

  state = {
    purchasing:false,
    loading:false
  }

  componentDidMount() {
    this.props.initingredients();
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
    this.props.onInitPurchase()
    this.props.history.push({
      pathname:"/Checkout"
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
    ings: state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice,
    purchased:state.order.purchasing
  }
}
const mapDispatchToProps = (dispatch)=>{
  return{
    ingredientsAdded:(ingName)=>dispatch(burgerBuilderActions.addIngredient(ingName)),
    ingredientsRemove:(ingName)=>dispatch(burgerBuilderActions.removeIngredient(ingName)),
    initingredients:()=>dispatch(burgerBuilderActions.initIngredients()),
    onInitPurchase:()=>dispatch(orderActions.purchaseInit())
  }
}
export default connect(mapStateTOProps,mapDispatchToProps)(BuregerBuilder);
