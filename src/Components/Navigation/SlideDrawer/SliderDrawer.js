import React from 'react';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from './SlideDrawer.module.css'
import BackDrop from "../../UI/BackDrop/BackDrop";
import Aux from "../../../hoc/Aux/Aux"
const SliderDrawer = (props) =>{
  let attachedClasses = [classes.SlideDrawer,classes.Close];
  if (props.open){
    attachedClasses = [classes.SlideDrawer,classes.Open]
  }
    return (
      <Aux>
      <BackDrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems/>
        </nav>
      </div>
      </Aux>
    );
  }


export default SliderDrawer;
