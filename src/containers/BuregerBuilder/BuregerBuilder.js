import React, {Component} from 'react';
import Auxiliary from "../../hoc/Auxiliary/Auxiliary";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Model from '../../Components/UI/Model/Model'
import OrderSummary from "../../Components/Burger/OrderSummary/OrderSummary";
import axios from "../../Axios-Orders.js";
import Spinner from "../../Components/UI/Spinner/Spinner";
const ingredientsPrices = {
  salad : 0.5,
  cheese: 0.4,
  bacon: 0.8,
  meat: 1.4
}
class BuregerBuilder extends Component {
  // constructor(props) {
  //   super(props);
  // }
  state = {
  ingredients:null,
    totalPrice:4,
    purchasable:false,
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
    this.setState({purchasable : sum > 0})
  }
  addIngredientsHandeler = (type)=>{
    const  oldCount = this.state.ingredients[type];
    const updatedCount = oldCount+1;
    const  updatedIngredients ={
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceAddition = ingredientsPrices[type];
    const newPrice = this.state.totalPrice + priceAddition;
    this.setState({totalPrice:newPrice , ingredients:updatedIngredients})
     this.updatePurchasable(updatedIngredients);
  }
  removeIngredientsHandeler = (type)=>{
    const  oldCount = this.state.ingredients[type];
    if(oldCount <= 0){
      return ;
    }
    const updatedCount = oldCount-1;
    const  updatedIngredients ={
      ...this.state.ingredients
    };
    updatedIngredients[type] = updatedCount;
    const priceDeduction = ingredientsPrices[type];
    const newPrice = this.state.totalPrice - priceDeduction;
    this.setState({totalPrice:newPrice , ingredients:updatedIngredients})
    this.updatePurchasable(updatedIngredients);
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
    queryParams.push("price="+this.state.totalPrice);
    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname:"/Checkout",
      search:"?"+ queryString
    })
  }
  render() {
    const disabledInfo = {
      ...this.state.ingredients
    };

    for(let key in disabledInfo){
      disabledInfo[key] = disabledInfo[key] <= 0
    }
    let orderSummary = null;


    let burger = <Spinner/>

    if(this.state.ingredients){
      burger = (
        <Auxiliary>
        <Burger ingredients={this.state.ingredients}/>
        <BuildControls ingredientAdded={this.addIngredientsHandeler}
                     ingredientRemoved={this.removeIngredientsHandeler}
                     disabled={disabledInfo}
                     purchasable ={this.state.purchasable}
                     ordered = {this.purchasHandeler}
                     price={this.state.totalPrice}/>
        </Auxiliary>
      );
      orderSummary = <OrderSummary
        ingredients={this.state.ingredients}
        purchasCancel={this.purchasCancelHandeler}
        purchasContinue = {this.purchasContinueHandeler}
        price={this.state.totalPrice}/>;
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

export default BuregerBuilder;
