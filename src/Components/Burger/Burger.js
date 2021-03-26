import React, {Component} from 'react';
import classes from './Burger.module.css';
import Burgeringredient from "./Burgeringredient/Burgeringredient";
class Burger extends Component {

  render() {

    let transformIngredients = Object.keys(this.props.ingredients)
      .map((igKey)=>{
        return [...Array(this.props.ingredients[igKey])].map((_,i)=>{
          return <Burgeringredient key={igKey+i} type={igKey}/>;
        });
      })
      .reduce((arr,el)=>{
        return arr.concat(el)
      },[])
    if(transformIngredients.length === 0){
      transformIngredients = <p>please start adding ingredients!</p>
    }
    return (
      <div className={classes.Burger}>
        <Burgeringredient type='bread-top'/>
        {transformIngredients}
        <Burgeringredient type='bread-bottom'/>
      </div>
    );
  }
}

export default Burger;
