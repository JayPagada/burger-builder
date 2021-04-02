import * as actionTypes from "./actionsTypes.js"
import axios from "../../Axios-Orders";


export const addIngredient = (name)=>{
  return{
    type:actionTypes.ADD_INGREDIENT,
    ingredientName: name
  };
};
export const removeIngredient = (name)=>{
  return{
    type:actionTypes.REMOVE_INGREDIENT,
    ingredientName: name
  };
};
export const setIngredient = (ingredient)=>{
  return{
    type:actionTypes.SET_INGREDIENT,
    ingredients: ingredient
  };
};
export const initIngredients = ()=>{
  return dispatch => {
    axios.get("https://burger-builder-db98e-default-rtdb.firebaseio.com/ingredients.json")
      .then(response=> {
       dispatch(setIngredient(response.data));
      })
  };
};

