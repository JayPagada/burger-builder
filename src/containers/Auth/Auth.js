import React, {Component} from 'react';
import Input from "../../Components/UI/input/input";
import Button from "../../Components/UI/Button/Button";
import "./Auth.css";
import * as actions from "../../Store/actions/auth.js";
import {connect} from "react-redux";
import Spinner from "../../Components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom"
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "your mail"
        },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "your password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 7
        },
        valid: false,
        touched: false
      }
    },
    isSignUp:true
  }

  submitHandler = (e) =>{
    e.preventDefault();
    this.props.onAuth(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    // const formData = {}
    // for(let controlName in this.state.controls){
    //   formData[controlName] = this.state.orderForm[controlName].value
    // }
    // const orders = {
    //   ingredients:this.props.ings,
    //   price:this.props.price,
    //   orderData : formData
    // }
    // this.props.onOrderBurger(orders)
  }
  switchAuthModeHandler = ()=>{
    this.setState(prevState=>{
      return{
        isSignUp:!prevState.isSignUp
      };
    })
  }
  checkValidity = (value, rules) => {
    let isValid = true;
    if (rules.required) {
      isValid = value.trim() !== "" && isValid;
    }
    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid
    }
    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid
    }
    if (rules.isEmail) {
      const pattarn = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      isValid = pattarn.test(value) && isValid;
    }
    return isValid
  }
  inputChangeHandeler= (event, controlName)=>{
    const updatedControls = {...this.state.controls,
          [controlName]:{
            ...this.state.controls[controlName],
            value : event.target.value,
            valid :this.checkValidity(event.target.value,this.state.controls[controlName].validation),
            touched: true,

          }
    };
    this.setState({controls:updatedControls})
  }
  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({id: key, config: this.state.controls[key]})
    }
    let form = (
      <form onSubmit={this.submitHandler}>
        {formElementArray.map(formElement => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => this.inputChangeHandeler(event, formElement.id)}/>
        ))}
        <Button btnType="Success" >Submit</Button>
      </form>

    );
    if (this.props.loading){
      form = <Spinner/>
    }

    let errorMessage = null;
    if (this.props.error){
      errorMessage=(
        <p>{this.props.error.message}</p>
      )
    }

    let authRedirect = null;
    if (this.props.isAuthenticated){
      authRedirect = <Redirect to="/"/>
    }
    return (
      <div className="AuthData">
        {authRedirect}
        {errorMessage}
        {form}
        <Button btnType="Danger"  Clicked={this.switchAuthModeHandler}> SWITCH TO {this.state.isSignUp? "SIGN IN" : "SIGN UP"}</Button>
      </div>
    );
  }
}
const mapStateToProps = (state)=>{
return{
  loading:state.auth.loading,
  error:state.auth.error,
  isAuthenticated:state.auth.token !== null
};
}
const mapDispatchToProps = dispatch =>{
  return {
    onAuth : (email,password,isSignUp) =>dispatch(actions.auth(email,password,isSignUp))
  }
};

export default connect(mapStateToProps,mapDispatchToProps)(Auth);
