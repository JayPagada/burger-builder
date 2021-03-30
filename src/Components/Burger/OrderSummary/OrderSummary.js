import React, {Component} from 'react';
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary";
import Button from "../../UI/Button/Button"

class OrderSummary extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("sdfgdfghd")
  }

  render() {


      const ingredientsSummary = Object.keys(this.props.ingredients).map(igkey => {
        return (
          <li key={igkey + 1}><span style={{textTransform: 'capitalize'}}> {igkey}</span> : {this.props.ingredients[igkey]}
          </li>
        )
      })
      return (
        <Auxiliary>
          <h3>Your order</h3>
          <p>A burger with the following ingredients</p>
          <ul>
            {ingredientsSummary}
          </ul>
          <p><strong>Total Price: {this.props.price.toFixed(2)}</strong></p>
          <p> Continue to Checkout</p>
          <Button Clicked={this.props.purchasCancel} btnType="Danger">Cancel</Button>
          <Button Clicked={this.props.purchasContinue} btnType="Success">Continue</Button>

        </Auxiliary>
      );
    }

}
export default OrderSummary;
