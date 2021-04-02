import React, {Component} from 'react';
import Button from "../../../Components/UI/Button/Button";
import classes from "./ContactData.module.css"
// import axios from "../../../Axios-Orders.js";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Input from "../../../Components/UI/input/input";
import {connect} from "react-redux";
import * as actions from "../../../Store/actions/order.js"
class ContactData extends Component {
  state={
   orderForm:{
     name:{
       elementType:"input",
       elementConfig:{
         type:"text",
         placeholder:"your name"
       },
       value:"",
       validation:{
         required:true
       },
       valid:false,
       touched:false
     },
     street:{
      elementType:"input",
      elementConfig:{
        type:"text",
        placeholder:"your street"
      },
      value:"",
      validation:{
        required:true
      },
      valid:false,
      touched:false
    },
    zipCode:{
      elementType:"input",
      elementConfig:{
        type:"text",
        placeholder:"your zipcode"
      },
      value:"",
      validation:{
        required:true,
        minLength:5,
        maxLength:5
      },
      valid:false,
      touched:false
    },
    country:{
      elementType:"input",
      elementConfig:{
        type:"text",
        placeholder:"your country"
      },
      value:"",
      validation:{
        required:true
      },
      valid:false,
      touched:false
    },
    email:{
      elementType:"input",
      elementConfig:{
        type:"email",
        placeholder:"your E-mail"
      },
      value:"",
      validation:{
        required:true
      },
      valid:false,
      touched:false
    },
    deliveryMethod:{
      elementType:"select",
      elementConfig:{
        option:[
                {value:"fastest" , displayValue:"Fastest"},
                {value:"cheapest",displayValue:"cheapest"}
                ]                                          
      },
      value:"fastest",
      validation:{},
      valid:true
    },
   },
    loading: false,
    formIsValid:false
  }

  orderHandeler = (e) =>{
    e.preventDefault();
      const formData = {}
      for(let elementIdentifier in this.state.orderForm){
        formData[elementIdentifier] = this.state.orderForm[elementIdentifier].value
      }
      const orders = {
        ingredients:this.props.ings,
        price:this.props.price,
        orderData : formData
      }
    this.props.onOrderBurger(orders)
  }
  checkValidity = (value,rules)=>{
    let isValid = true;
      if(rules.required){
        isValid = value.trim() !== "" && isValid;
      }
      if(rules.minLength){
        isValid = value.length >=rules.minLength && isValid
      }
      if(rules.maxLength){
        isValid = value.length <=rules.maxLength && isValid
      }
      return isValid
  }
  inputChangeHandeler= (event, inputIdentifier)=>{
  const updatedOrderForm = {...this.state.orderForm};
  const updatedFormElement = {...updatedOrderForm[inputIdentifier]};
  updatedFormElement.value = event.target.value;
  updatedFormElement.valid = this.checkValidity(updatedFormElement.value , updatedFormElement.validation)
  updatedFormElement.touched= true;
  updatedOrderForm[inputIdentifier] = updatedFormElement
  let formIsValid = true;
  for(let inputIdentifier in updatedOrderForm){
    formIsValid = updatedOrderForm[inputIdentifier].valid && formIsValid;
  }
  this.setState({orderForm:updatedOrderForm , formIsValid:formIsValid})
  }
  render() { 
    const formElementArray = [];
    for(let key in this.state.orderForm){
      formElementArray.push({id:key, config:this.state.orderForm[key]})
    }
    let form = (
      <form onSubmit={this.orderHandeler}>
        {/* <Input elementType="" elementConfig="" value=""/> */}
        {formElementArray.map(formElement =>(
          <Input 
            key={formElement.id}
            elementType={formElement.config.elementType} 
            elementConfig={formElement.config.elementConfig} 
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched = {formElement.config.touched}
            changed={(event)=>this.inputChangeHandeler(event,formElement.id)}/>
        ))}
        <Button btnType="Success" disabled={!this.state.formIsValid} >Order</Button>
      </form>
    );
    if(this.props.loading){
      form=<Spinner/>
    }
    return (
      <div className={classes.ContactData}>
        <h4> enter your contact data</h4>
        {form}
      </div>
    );
  }
}
const mapStateTOProps=(state)=>{
  return{
    ings: state.burgerBuilder.ingredients,
    price:state.burgerBuilder.totalPrice,
    loading:state.order.loading
  };
};
const mapDispatchToProps = dispatch =>{
  return {
    onOrderBurger : (orderData) =>dispatch(actions.purchaseBurgerStart(orderData))
  }
};
export default connect(mapStateTOProps,mapDispatchToProps)(ContactData);
