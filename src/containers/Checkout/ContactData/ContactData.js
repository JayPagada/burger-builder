import React, {Component} from 'react';
import Button from "../../../Components/UI/Button/Button";
import classes from "./ContactData.module.css"
import axios from "../../../Axios-Orders.js";
import Spinner from "../../../Components/UI/Spinner/Spinner";
class ContactData extends Component {
  state={
    name:"",
    email:"",
    address:{
      Street:"",
      PostalCode:""
    },
    loading: false
  }

  orderHandeler = (e) =>{
    e.preventDefault();
      this.setState({loading : true});
      const orders = {
        ingredients:this.props.ingredients,
        price:this.props.totalPrice,
        customer:{
          name:"jay pagada",
          address:{
            street:"sarita p-2",
            zipCode:"395010",
            country:"india"
          },
          email:"jaypagada@yahoo.com"
        },
        deliveryMethod:"fastest"
      }
      axios.post("/orders.json",orders)
        .then(responce=>{
          this.setState({loading:false});
          this.props.history.push("/")
          })
        .catch(error=>{
          this.setState({loading:false});
        });
  }
  render() {
    let form = (
      <form>
        <input type="text" name="name" placeholder="your Name"/>
        <input type="email" name="email" placeholder="your Mail"/>
        <input type="text" name="street" placeholder="your Street"/>
        <input type="text" name="postal" placeholder="your Postal Code"/>
        <Button btnType="Success" Clicked={this.orderHandeler}>Order</Button>
      </form>
    );
    if(this.state.loading){
      form=<Spinner/>
    }
    console.log(this.props.totalPrice)
    return (
      <div className={classes.ContactData}>
        <h4> enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
