import React, {Component} from "react"
import {Route, Redirect , Switch} from "react-router-dom"
import {withRouter} from "react-router-dom"
import Layout from "./hoc/Layout/layout";
import BuregerBuilder from "./containers/BuregerBuilder/BuregerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import * as action from "./Store/actions/auth.js"
import {connect} from "react-redux";

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignup();
  }

  render() {
    let routes = (
      <Switch>
        <Route path="/Auth" exact component={Auth}/>,
        <Route path="/" exact component={BuregerBuilder}/>,
        <Redirect to="/"/>
      </Switch>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/Checkout" component={Checkout}/>,
          <Route path="/orders" component={Orders}/>,
          <Route path="/" exact component={BuregerBuilder}/>,
          <Route path="/logout" exact component={Logout}/>,
          <Redirect to="/"/>
        </Switch>
      );
    }
    return (
      <div>
        <Layout>
          {routes}
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.token !== null
  };
}
const mapDispatchToProps = (dispatch) => {
  return {
    onTryAutoSignup: () => dispatch(action.authCheckState())
  }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
