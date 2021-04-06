import React from 'react';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from './SlideDrawer.module.css'
import BackDrop from "../../UI/BackDrop/BackDrop";
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary"
const SliderDrawer = (props) =>{
  let attachedClasses = [classes.SlideDrawer,classes.Close];
  if (props.open){
    attachedClasses = [classes.SlideDrawer,classes.Open]
  }
    return (
      <Auxiliary>
      <BackDrop show={props.open} clicked={props.closed}/>
      <div className={attachedClasses.join(" ")}>
        <div className={classes.Logo}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems isAuth={props.isAuth}/>
        </nav>
      </div>
      </Auxiliary>
    );
  }


export default SliderDrawer;
