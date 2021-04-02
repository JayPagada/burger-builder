import React, {Component} from 'react';
import classes from './Burger.module.css';
import BurgerIngredient from "./Burgeringredient/Burgeringredient";
class Burger extends Component {

  render() {

    let transformIngredients = Object.keys(this.props.ingredients)
      .map((igKey)=>{
        return [...Array(this.props.ingredients[igKey])].map((_,i)=>{
          return <BurgerIngredient key={igKey+i} type={igKey}/>;
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
        <BurgerIngredient type='bread-top'/>
        {transformIngredients}
        <BurgerIngredient type='bread-bottom'/>
      </div>
    );
  }
}

export default Burger;
