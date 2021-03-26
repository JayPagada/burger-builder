import React,{Component} from "react"
import {Route} from "react-router-dom"
import Layout from "./hoc/Layout/layout";
import BuregerBuilder from "./containers/BuregerBuilder/BuregerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
class App extends Component{
  render() {


  return (
    <div>
      <Layout>
        <Route path="/Checkout" component={Checkout}/>
        <Route path="/orders" component={Orders}/>
        <Route path="/" exact component={BuregerBuilder}/>
      </Layout>
    </div>
  );
}}

export default App;
