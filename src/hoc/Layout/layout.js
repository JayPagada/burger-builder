import React, {Component} from 'react';
import Auxiliary from '../Auxiliary/Auxiliary';
import Toolbar from "../../Components/Navigation/Toolbar/Toolbar"
import classes from './layout.module.css'
import SliderDrawer from "../../Components/Navigation/SlideDrawer/SliderDrawer";

class Layout extends Component {
  state = {
    showSlideDrawer: false
  }
  sideDrawerClosedHandler =()=>{
  this.setState({showSlideDrawer:false});
  }
  sideDrawerToggleHandeler = ()=>{
    this.setState((prevState)=>{return {showSlideDrawer: !prevState.showSlideDrawer}})
  }
  render() {
    return (
      <Auxiliary>
        <Toolbar drawerToggleHandeler={this.sideDrawerToggleHandeler}/>
        <SliderDrawer open={this.state.showSlideDrawer} closed={this.sideDrawerClosedHandler}/>
        <main className={classes.content}>
          {this.props.children}
        </main>
      </Auxiliary>
    );
  }
}

export default Layout;
